import { createSlotKey, encryptSlot, decryptSlot } from "../../../../tools/crypto";
import { Slot, Fields } from "../../../model/saga/source";
import { DecryptedContentType } from "../../decryptedContent/reducer";
import { ContentStateType } from "../content/reducer";

export function initEditingContent(slot: Slot, decryptedContent: DecryptedContentType) {
  const content = {
    value: "",
    encrypted: false,
    password: "",
  };
  if (slot.content) {
    if (slot.content.encrypted) {
      if (decryptedContent) {
        content.value = decryptSlot(
          decryptedContent.key,
          slot.content.value,
        );
        content.encrypted = true;
      }
    } else {
      content.value = slot.content.value;
    }
  }
  return content;
}

export function createContent(fields: Fields, content: ContentStateType) {
  if (content.value) {
    fields.content = {};
    if (content.encrypted && content.password) {
      const key = createSlotKey(content.password);
      fields.content.value = encryptSlot(key, content.value);
      fields.content.encrypted = true;
    } else {
      fields.content.value = content.value;
    }
  }
}

export function updateContent(
  fields: Fields,
  slot: Slot,
  content: ContentStateType,
  decryptedContent: DecryptedContentType,
) {
  if (!slot.content || !slot.content.encrypted || decryptedContent) {
    if (content.value) {
      let contentValue;
      if (content.encrypted) {
        const key = content.password
          ? createSlotKey(content.password)
          : decryptedContent.key;
        contentValue = encryptSlot(key, content.value);
      } else {
        contentValue = content.value;
      }
      if (slot.content) {
        fields.content = {};
        if (slot.content.value !== contentValue) {
          fields.content.value = contentValue;
        }
        if (!slot.content.encrypted === content.encrypted) {
          fields.content.encrypted = content.encrypted;
        }
      } else {
        fields.content = {
          value: contentValue,
        };
        if (content.encrypted) {
          fields.content.encrypted = true;
        }
      }
    } else if (slot.content) {
      fields.content = null;
    }
  }
}
