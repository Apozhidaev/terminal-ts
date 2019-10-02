import Content from './Content';
import Resource from './Resource';

class Slot {
  public id: number;
  public creation: number;
  public summary: number;
  public content?: Content;
  public archive?: boolean;
  public root?: boolean;
  public resources?: Resource[];

  constructor({
    id,
    creation,
    summary,
    content,
    archive,
    root,
    resources,
  }: Slot) {
    this.id = id;
    this.creation = creation;
    this.summary = summary;
    if (content) {
      this.content = new Content(content);
    }
    if (archive) {
      this.archive = true;
    }
    if (root) {
      this.root = true;
    }
    if (resources && resources.length) {
      this.resources = resources.map((resource) => new Resource(resource));
    }
  }

  // tempory hack while refactoring
  public toObj() {
    const obj: any = {
      id: this.id,
      creation: this.creation,
    };
    if (this.content) {
      obj.content = this.content.toObj();
    }
    if (this.archive) {
      this.archive = true;
    }
    if (this.root) {
      this.root = true;
    }
    if (this.resources && this.resources.length) {
      this.resources = this.resources.map((resource) => resource.toObj());
    }
    return obj;
  }
}

export default Slot;
