/* eslint-disable no-param-reassign */
import { clearValues, diff } from 'kvjs';
import Book from './source/Book';
import Slot from './source/Slot';
import Link from './source/Link';
import { mapper } from './source/scheme';


let model = {};

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

function updateField(source, field, fields) {
  if (field in fields) {
    if (fields[field]) {
      source[field] = fields[field];
    } else {
      delete source[field];
    }
  }
}

function updateRelations(source, id, parents) {
  const parentMap = new Map(parents.map((x) => [x.id, x]));
  const existMap = {};

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

function removeRelations(source, id) {
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

export function setSrcObj(srcObj) {
  srcObj.slots = srcObj.slots || [];
  srcObj.links = srcObj.links || [];
  const source = new Book(srcObj);

  const slots = [];
  const children = [];
  const parents = [];

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

export function setModel(keyValues) {
  const srcObj = mapper.toObject(keyValues);
  return setSrcObj(srcObj);
}

export function upload(srcObj) {
  const { source } = model;
  setSrcObj(srcObj);
  const keyValuesBefore = source ? mapper.toKeyValues(source) : [];
  const keyValuesAfter = mapper.toKeyValues(model.source);
  const keyValues = diff(keyValuesBefore, keyValuesAfter);
  return { keyValues, model };
}

export function createSlot({ fields }) {
  const { source, slots } = model;
  let slot = {
    id: slots.length || 1,
    creation: Date.now(),
  };
  updateField(slot, 'archive', fields);
  updateField(slot, 'root', fields);
  updateField(slot, 'summary', fields);
  updateField(slot, 'content', fields);
  updateField(slot, 'resources', fields);

  slot = new Slot(slot);

  source.slots.push(slot);
  slots[slot.id] = slot;

  let addedLinks = [];
  if ('parents' in fields) {
    addedLinks = updateRelations(source, slot.id, fields.parents).addedLinks;
  }

  const tempBook = {
    slots: [slot],
    links: addedLinks,
  };
  const keyValues = mapper.toKeyValues(tempBook);
  return { slot, addedLinks, keyValues };
}

export function updateSlot({ id, fields }) {
  const { source, slots } = model;
  const slot = slots[id];

  let addedLinks = [];
  let removedLinks = [];
  if ('parents' in fields) {
    const res = updateRelations(source, id, fields.parents);
    addedLinks = res.addedLinks;
    removedLinks = res.removedLinks;
  }

  const tempBookBefore = {
    slots: [slot],
    links: removedLinks,
  };

  const keyValuesBefore = mapper.toKeyValues(tempBookBefore);

  updateField(slot, 'archive', fields);
  updateField(slot, 'root', fields);
  updateField(slot, 'summary', fields);
  updateField(slot, 'resources', fields);

  if ('content' in fields) {
    if (fields.content) {
      if (!slot.content) {
        slot.content = {};
      }
      updateField(slot.content, 'value', fields.content);
      updateField(slot.content, 'encrypted', fields.content);
    } else {
      delete slot.content;
    }
  }

  const tempBookAfter = {
    slots: [slot],
    links: addedLinks,
  };
  const keyValuesAfter = mapper.toKeyValues(tempBookAfter);
  const keyValues = diff(keyValuesBefore, keyValuesAfter);
  return {
    slot,
    addedLinks,
    removedLinks,
    keyValues,
  };
}

export function removeSlot({ id }) {
  const { source, slots } = model;
  const slot = slots[id];
  const index = source.slots.indexOf(slot);
  source.slots.splice(index, 1);
  delete slots[id];
  const removedLinks = removeRelations(source, id);

  const tempBook = {
    slots: [slot],
    links: removedLinks,
  };
  const keyValues = mapper.toKeyValues(tempBook);
  clearValues(keyValues);
  return { slot, removedLinks, keyValues };
}
