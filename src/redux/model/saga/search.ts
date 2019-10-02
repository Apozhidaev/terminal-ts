import { Slot } from './source';

const replacer: any = {
  "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
  "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
  "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
  ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
  "n": "т", "m": "ь", ",": "б", ".": "ю", "/": ".",
  "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u",
  "ш": "i", "щ": "o", "з": "p", "х": "[", "ъ": "]", "ф": "a", "ы": "s",
  "в": "d", "а": "f", "п": "g", "р": "h", "о": "j", "л": "k", "д": "l",
  "ж": ";", "э": "'", "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b",
  "т": "n", "ь": "m", "б": ",", "ю": ".",
};

function multiQuery(query: string) {
  const newQuery = [];
  for (let i = 0; i < query.length; i++) {
    const replace = replacer[query[i].toLowerCase()];
    if (replace) {
      newQuery[i] = replace;
    } else {
      newQuery[i] = query[i];
    }
  }
  return newQuery.join('');
}

function testQuery(value: string, query: string) {
  return new RegExp(query, 'ig').test(value)
    || (new RegExp(multiQuery(query), 'ig')).test(value);
}

function getWeight(slot: Slot, query: string) {
  let weight = 0;
  const summaryFilter = testQuery(slot.summary, query);
  let contentFilter = false;
  if (slot.content && !slot.content.encrypted) {
    contentFilter = testQuery(slot.content.value, query);
  }
  if (summaryFilter) weight += 2;
  if (contentFilter) weight += 1;
  return weight;
}

const dateUpReg = /date:up/g;
const dateDownReg = /date:down/g;

export default function search(slots: Slot[], q: string) {
  let query = q;
  if (query) {
    let dateFilter;
    if (dateDownReg.test(query)) {
      dateFilter = 'up';
      query = query.replace(dateDownReg, '').trim();
    }
    if (dateUpReg.test(query)) {
      dateFilter = 'down';
      query = query.replace(dateUpReg, '').trim();
    }
    let weights = query ? slots.map((slot) => ({
      weight: getWeight(slot, query),
      slot,
    })) : slots.map((slot) => ({
      weight: 1,
      slot,
    }));
    weights = weights.filter((item) => item.weight > 0);
    if (dateFilter) {
      if (dateFilter === 'up') {
        weights.sort((left, right) => (left.slot.creation === right.slot.creation
          ? left.slot.id - right.slot.id
          : left.slot.creation - right.slot.creation));
      } else {
        weights.sort((left, right) => (left.slot.creation === right.slot.creation
          ? right.slot.id - left.slot.id
          : right.slot.creation - left.slot.creation));
      }
    } else {
      weights.sort((left, right) => (right.weight === left.weight
        ? right.slot.id - left.slot.id
        : right.weight - left.weight));
    }
    return weights.map((item) => item.slot);
  }
  return slots;
}
