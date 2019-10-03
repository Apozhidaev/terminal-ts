import moment from "moment";
import axios from "axios";
import { WordArray } from "crypto-js";
import {
  createPasskey,
  decryptBackup,
  encryptBackup,
} from "../../../../tools/crypto";
import { KeyValue } from "../../../model/saga/source";

// cause it has legacy slots
function timeFix(storage: { keyValues: KeyValue[] }) {
  const { keyValues } = storage;
  const creationTime = /^s\.\d+\.time/;
  for (let i = 0; i < keyValues.length; i++) {
    const { key, value } = keyValues[i];
    if (value && creationTime.test(key)) {
      const time = moment(value);
      if (time.isValid()) {
        keyValues[i].value = String(moment(value).valueOf());
      }
    }
  }
}

const backupClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export async function getProfile({ name, password }: { name: string, password: string }) {
  const passkey = createPasskey(password, name);
  const { data: profile } = await backupClient.get("/session", {
    params: { passkey },
  });
  return profile;
}

export async function getStorage({ token }: { token: string }) {
  const { data: storage } = await backupClient.get("/store", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  timeFix(storage);
  return storage;
}

export async function syncStorage({ token, keyValues, sync }: { token: string, keyValues: KeyValue[], sync: number }) {
  const { data: storage } = await backupClient.post("/store",
    { sync, keyValues },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  timeFix(storage);
  return storage;
}

// crypto
function makeCryptoKeyValues(
  keyValues: KeyValue[],
  makeCrypto: (value: string) => string,
) {
  const сryptoKeyValues = [];
  const summary = /^s\.\d+\.sm/;
  const contentValue = /^s\.\d+\.c\.val/;
  const resUrl = /^s\.\d+\.r\.\d+\.url/;
  const resDesc = /^s\.\d+\.r\.\d+\.desc/;
  for (let i = 0; i < keyValues.length; i++) {
    const { key, value } = keyValues[i];
    if (value
      && (summary.test(key) || contentValue.test(key) || resUrl.test(key) || resDesc.test(key))) {
      сryptoKeyValues[i] = {
        ...keyValues[i],
        value: makeCrypto(value),
      };
    } else {
      сryptoKeyValues[i] = keyValues[i];
    }
  }
  return сryptoKeyValues;
}

export function decryptKeyValues(keyValues: KeyValue[], encryptionKey: WordArray) {
  return makeCryptoKeyValues(keyValues, decryptBackup.bind(null, encryptionKey));
}

export function encryptKeyValues(keyValues: KeyValue[], encryptionKey: WordArray) {
  return makeCryptoKeyValues(keyValues, encryptBackup.bind(null, encryptionKey));
}
