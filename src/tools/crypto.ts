import CryptoJS, { WordArray } from 'crypto-js';

const backupIV = CryptoJS.enc.Hex.parse('540c59710a94fa97c0641e71b432729a');
const backupSalt = CryptoJS.enc.Hex.parse('b484087cfb3708cb92b0645aac2f4ec1');

const slotIV = CryptoJS.enc.Hex.parse('eaf0485aece87b8af4ba110533a25d9e');
const slotSalt = CryptoJS.enc.Hex.parse('039afbed7a1c2570361a5656e6d79705');

const passkeySalt = CryptoJS.enc.Hex.parse('316d0d686dccb19344f6fc33f4f4f110');

export class CryptoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CryptoError';
  }
}

function createPBKDF2(salt: string, password: string, name: string = '') {
  const passExp = name.toLowerCase().trim() + password.trim();
  return CryptoJS.PBKDF2(passExp, salt, { keySize: 256 / 32, iterations: 1000 });
}

function decrypt(key: WordArray, iv: string, value: string): string {
  const decrypted = CryptoJS.AES.decrypt(value, key, { iv });
  const res = decrypted.toString(CryptoJS.enc.Utf8);
  if (!res) {
    throw new CryptoError('Password is not correct');
  }
  return res;
}

function encrypt(key: WordArray, iv: string, value: string): string {
  const encrypted = CryptoJS.AES.encrypt(value, key, { iv });
  return encrypted.toString();
}

export function decryptSlot(key: WordArray, value: string): string {
  return decrypt(key, slotIV, value);
}

export function encryptSlot(key: WordArray, value: string): string {
  return encrypt(key, slotIV, value);
}

export function decryptBackup(key: WordArray, value: string): string {
  return decrypt(key, backupIV, value);
}

export function encryptBackup(key: WordArray, value: string): string {
  return encrypt(key, backupIV, value);
}

export function createPasskey(password: string, name: string): string {
  const key = createPBKDF2(passkeySalt, password, name);
  return CryptoJS.enc.Hex.stringify(key);
}

export function createSlotKey(password: string): WordArray {
  return createPBKDF2(slotSalt, password);
}

export function createBackupKey(password: string, name: string): WordArray {
  return createPBKDF2(backupSalt, password, name);
}
