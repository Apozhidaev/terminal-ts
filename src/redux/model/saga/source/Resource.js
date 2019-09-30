class Resource {
  constructor({ url, description }) {
    this.url = url;
    if (description) {
      this.description = description;
    }
  }
}

export default Resource;
