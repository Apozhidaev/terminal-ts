/* eslint-disable no-param-reassign */
import { clearValues, diff } from "kvjs";
import {
  Content,
  Link,
  Slot,
  Book,
  Model,
  KeyValue,
  Fields,
} from "./source";
import { mapper } from "./source/scheme";

let model: Model;

function invalidateRelations() {
  const {
    source,
    slots,
    parents,
    children,
  } = model;

  parents.length = 0;
  children.length = 0;
  for (let i = 0; i < source.links.length; i++) {
    if (!children[source.links[i].up]) {
      children[source.links[i].up] = [];
    }
    const child = slots[source.links[i].down];
    children[source.links[i].up].push(child);

    if (!parents[source.links[i].down]) {
      parents[source.links[i].down] = [];
    }
    const parent = slots[source.links[i].up];
    parents[source.links[i].down].push(parent);
  }
}

function updateField(source: any, field: string, fields: Fields) {
  if (field in fields) {
    if (fields[field]) {
      source[field] = fields[field];
    } else {
      delete source[field];
    }
  }
}

function updateRelations(source: Book, id: number, parents: Slot[]) {
  const parentMap = new Map(parents.map((x) => [x.id, x]));
  const existMap: any = {};

  const addedLinks = [];
  const removedLinks = [];

  const newLinks = [];
  const { links } = source;

  for (let i = 0; i < links.length; i++) {
    if (links[i].down !== id) {
      newLinks.push(links[i]);
    } else if (parentMap.has(links[i].up)) {
      newLinks.push(links[i]);
      existMap[links[i].up] = parentMap.get(links[i].up);
    } else {
      removedLinks.push(links[i]);
    }
  }

  for (let i = 0; i < parents.length; i++) {
    if (!existMap[parents[i].id]) {
      const link = new Link({
        down: id,
        up: parents[i].id,
      });
      newLinks.push(link);
      addedLinks.push(link);
    }
  }

  source.links = newLinks;
  invalidateRelations();
  return { addedLinks, removedLinks };
}

function removeRelations(source: Book, id: number) {
  const newLinks = [];
  const removedLinks = [];
  const { links } = source;

  for (let i = 0; i < links.length; i++) {
    if (links[i].down !== id && links[i].up !== id) {
      newLinks.push(links[i]);
    } else {
      removedLinks.push(links[i]);
    }
  }
  source.links = newLinks;
  invalidateRelations();
  return removedLinks;
}

export function getModel() {
  return model;
}

export function setSrcObj(srcObj: Book) {
  srcObj.slots = srcObj.slots || [];
  srcObj.links = srcObj.links || [];
  const source = new Book(srcObj);

  const slots: Slot[] = [];
  const children: Slot[][] = [];
  const parents: Slot[][] = [];

  for (let i = 0; i < source.slots.length; i++) {
    slots[source.slots[i].id] = source.slots[i];
  }

  model = {
    source,
    slots,
    children,
    parents,
  };

  invalidateRelations();
  return model;
}

export function setModel(keyValues: KeyValue[]) {
  const srcObj = mapper.toObject(keyValues);
  return setSrcObj(srcObj);
}

export function upload(srcObj: Book) {
  const { source } = model;
  setSrcObj(srcObj);
  const keyValuesBefore = source ? mapper.toKeyValues(source) : [];
  const keyValuesAfter = mapper.toKeyValues(model.source);
  const keyValues = diff(keyValuesBefore, keyValuesAfter);
  return { keyValues, model };
}

export function createSlot({ fields }: { fields: Fields }) {
  const { source, slots } = model;
  const slotObj: any = {
    id: slots.length || 1,
    creation: Date.now(),
  };
  updateField(slotObj, "archive", fields);
  updateField(slotObj, "root", fields);
  updateField(slotObj, "summary", fields);
  updateField(slotObj, "content", fields);
  updateField(slotObj, "resources", fields);

  const slot = new Slot(slotObj);

  source.slots.push(slot);
  slots[slot.id] = slot;

  let addedLinks: Link[] = [];
  if ("parents" in fields) {
    addedLinks = updateRelations(source, slot.id, fields.parents).addedLinks;
  }

  const tempBook = {
    slots: [slotObj],
    links: addedLinks,
  };
  const keyValues = mapper.toKeyValues(tempBook) as KeyValue[];
  return { slot, addedLinks, keyValues, source };
}

export function updateSlot({ id, fields }: { id: number, fields: Fields }) {
  const { source, slots } = model;
  const slot = slots[id];

  let addedLinks: Link[] = [];
  let removedLinks: Link[] = [];
  if ("parents" in fields) {
    const res = updateRelations(source, id, fields.parents);
    addedLinks = res.addedLinks;
    removedLinks = res.removedLinks;
  }

  const tempBookBefore = {
    slots: [slot.toObj()],
    links: removedLinks,
  };

  const keyValuesBefore = mapper.toKeyValues(tempBookBefore);

  updateField(slot, "archive", fields);
  updateField(slot, "root", fields);
  updateField(slot, "summary", fields);
  updateField(slot, "resources", fields);

  if ("content" in fields) {
    if (fields.content) {
      const contentObj: any = slot.content || {};
      updateField(contentObj, "value", fields.content);
      updateField(contentObj, "encrypted", fields.content);
      slot.content = new Content(contentObj as Content);
    } else {
      delete slot.content;
    }
  }

  const tempBookAfter = {
    slots: [slot.toObj()],
    links: addedLinks,
  };
  const keyValuesAfter = mapper.toKeyValues(tempBookAfter);
  const keyValues = diff(keyValuesBefore, keyValuesAfter) as KeyValue[];
  return {
    slot,
    addedLinks,
    removedLinks,
    keyValues,
    source,
  };
}

export function removeSlot({ id }: { id: number }) {
  const { source, slots } = model;
  const slot = slots[id];
  const index = source.slots.indexOf(slot);
  source.slots.splice(index, 1);
  delete slots[id];
  const removedLinks = removeRelations(source, id);

  const tempBook = {
    slots: [slot.toObj()],
    links: removedLinks,
  };
  const keyValues = mapper.toKeyValues(tempBook) as KeyValue[];
  clearValues(keyValues);
  return { source, slot, removedLinks, keyValues };
}
