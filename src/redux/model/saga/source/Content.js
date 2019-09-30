class Content {
  constructor({ type, encrypted, value }) {
    this.value = value;
    if (encrypted) {
      this.encrypted = true;
    }
    if (type) {
      this.type = type;
    }
  }
}

export default Content;
