class Content {
  public type?: string;
  public encrypted?: boolean;
  public value: string;

  constructor({ type, encrypted, value }: Content) {
    this.value = value;
    if (encrypted) {
      this.encrypted = true;
    }
    if (type) {
      this.type = type;
    }
  }

  // tempory hack while refactoring
  public toObj() {
    const obj: any = {
      value: this.value,
    };
    if (this.encrypted) {
      obj.encrypted = true;
    }
    if (this.type) {
      obj.type = this.type;
    }
    return obj;
  }
}

export default Content;
