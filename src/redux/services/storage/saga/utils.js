/* eslint-disable no-param-reassign */
import cryptoJS from 'crypto-js';


const PROFILE = 'PROFILE';
const D_PREFIX = 'D_';
const SYNC_D_TIME = 'SYNC_D_TIME';


// profile
export function getProfile() {
  const profileJson = localStorage.getItem(PROFILE);
  if (profileJson) {
    return JSON.parse(profileJson, (key, value) => (
      key === 'encryptionKey'
        ? cryptoJS.enc.Hex.parse(value)
        : value
    ));
  }
  return null;
}

export function setProfile(profile) {
  const profileJson = JSON.stringify(profile, (key, value) => (
    key === 'encryptionKey'
      ? cryptoJS.enc.Hex.stringify(value)
      : value
  ));
  localStorage.setItem(PROFILE, profileJson);
}


// dictionary
function setSyncTime(time) {
  localStorage.setItem(SYNC_D_TIME, time);
}

function getSyncTime() {
  const timeJSON = localStorage.getItem(SYNC_D_TIME);
  if (timeJSON) {
    return Number(timeJSON);
  }
  return null;
}

function getKeyValue(key) {
  const keyValueJson = localStorage.getItem(key);
  if (keyValueJson) {
    const keyValue = JSON.parse(keyValueJson);
    return keyValue;
  }
  return null;
}

function findKeyValues({ exist, unsync }) {
  const keyValues = [];
  const keyPrefix = new RegExp(`^${D_PREFIX}`);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (keyPrefix.test(key)) {
      keyValues.push(getKeyValue(key));
    }
  }
  return keyValues.filter((kv) => (!exist || kv.value) && (!unsync || kv.unsync));
}

function setKeyValueItem(keyValue) {
  localStorage.setItem(D_PREFIX + keyValue.key, JSON.stringify(keyValue));
}

function setKeyValue(keyValue) {
  const value = getKeyValue(D_PREFIX + keyValue.key);
  if (value) {
    if (keyValue.time > value.time) {
      setKeyValueItem(keyValue);
    }
  } else {
    setKeyValueItem(keyValue);
  }
}

function successSync(keyValue) {
  const value = getKeyValue(D_PREFIX + keyValue.key);
  if (keyValue.time === value.time) {
    delete value.unsync;
    setKeyValueItem(value);
  }
}

export function syncDictionary({ sync, keyValues, syncedKeys }) {
  if (syncedKeys && syncedKeys.length) {
    for (let i = 0; i < syncedKeys.length; i++) {
      successSync(syncedKeys[i]);
    }
  }

  if (keyValues && keyValues.length) {
    for (let i = 0; i < keyValues.length; i++) {
      setKeyValue(keyValues[i]);
    }
  }

  setSyncTime(sync);
}

export function getDictionary() {
  return findKeyValues({ exist: true });
}

export function getUnsyncKeyValues() {
  const sync = getSyncTime();
  const keyValues = findKeyValues({ unsync: true });
  return { sync, keyValues };
}

export function updateDictionary(keyValues) {
  const time = Date.now();
  for (let i = 0; i < keyValues.length; i++) {
    keyValues[i].time = time;
    keyValues[i].unsync = true;
    setKeyValue(keyValues[i]);
  }
}


// clear
export function clear() {
  localStorage.clear();
}
