import cryptoJS from "crypto-js";

const PROFILE = "PROFILE";
const D_PREFIX = "D_";
const SYNC_D_TIME = "SYNC_D_TIME";

export type KeyValue = {
  time: number;
  key: string;
  value?: string;
  unsync?: boolean;
};

type LocalProfile = {
  local: true;
  token?: string;
  name?: string;
  password?: string;
};

type BackupProfile = {
  local?: false;
  token: string;
  name: string;
  password: string;
};

export type Profile = LocalProfile | BackupProfile;

// profile
export function getProfile(): Profile | undefined {
  const profileJson = localStorage.getItem(PROFILE);
  if (profileJson) {
    return JSON.parse(profileJson, (key, value) => (
      key === "encryptionKey"
        ? cryptoJS.enc.Hex.parse(value)
        : value
    ));
  }
  return undefined;
}

export function setProfile(profile: Profile) {
  const profileJson = JSON.stringify(profile, (key, value) => (
    key === "encryptionKey"
      ? cryptoJS.enc.Hex.stringify(value)
      : value
  ));
  localStorage.setItem(PROFILE, profileJson);
}

// dictionary
function setSyncTime(time: number) {
  localStorage.setItem(SYNC_D_TIME, time.toString());
}

function getSyncTime() {
  const timeJSON = localStorage.getItem(SYNC_D_TIME);
  if (timeJSON) {
    return Number(timeJSON);
  }
  return null;
}

function getKeyValue(key: string) {
  const keyValueJson = localStorage.getItem(key);
  if (keyValueJson) {
    const keyValue = JSON.parse(keyValueJson);
    return keyValue;
  }
  return null;
}

function findKeyValues({ exist, unsync }: { exist?: boolean, unsync?: boolean }) {
  const keyValues = [];
  const keyPrefix = new RegExp(`^${D_PREFIX}`);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) as string;
    if (keyPrefix.test(key)) {
      keyValues.push(getKeyValue(key));
    }
  }
  return keyValues.filter((kv) => (!exist || kv.value) && (!unsync || kv.unsync));
}

function setKeyValueItem(keyValue: KeyValue) {
  localStorage.setItem(D_PREFIX + keyValue.key, JSON.stringify(keyValue));
}

function setKeyValue(keyValue: KeyValue) {
  const value = getKeyValue(D_PREFIX + keyValue.key);
  if (value) {
    if (keyValue.time > value.time) {
      setKeyValueItem(keyValue);
    }
  } else {
    setKeyValueItem(keyValue);
  }
}

function successSync(keyValue: KeyValue) {
  const value = getKeyValue(D_PREFIX + keyValue.key);
  if (keyValue.time === value.time) {
    delete value.unsync;
    setKeyValueItem(value);
  }
}

export function syncDictionary({
  sync,
  keyValues,
  syncedKeys,
}: { sync: number, keyValues: KeyValue[], syncedKeys: KeyValue[] }) {
  if (syncedKeys && syncedKeys.length) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < syncedKeys.length; i++) {
      successSync(syncedKeys[i]);
    }
  }

  if (keyValues && keyValues.length) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keyValues.length; i++) {
      setKeyValue(keyValues[i]);
    }
  }

  setSyncTime(sync);
}

export function getDictionary() {
  return findKeyValues({ exist: true });
}

export function getUnsyncKeyValues(): { sync: number, keyValues: KeyValue[] } {
  const sync = getSyncTime() as number;
  const keyValues = findKeyValues({ unsync: true });
  return { sync, keyValues };
}

export function updateDictionary(keyValues: KeyValue[]) {
  const time = Date.now();
  // tslint:disable-next-line:prefer-for-of
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
