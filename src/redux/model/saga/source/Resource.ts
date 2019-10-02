class Resource {
  public url: string;
  public description?: string;

  constructor({ url, description }: Resource) {
    this.url = url;
    if (description) {
      this.description = description;
    }
  }

  // tempory hack while refactoring
  public toObj() {
    const obj: any = {
      url: this.url,
    };
    if (this.description) {
      obj.description = this.description;
    }
    return obj;
  }
}

export default Resource;
