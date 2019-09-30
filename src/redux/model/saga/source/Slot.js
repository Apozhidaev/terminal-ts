import Content from './Content';
import Resource from './Resource';

class Slot {
  constructor({
    id,
    creation,
    summary,
    content,
    archive,
    root,
    resources,
  }) {
    this.id = Number(id);
    this.creation = Number(creation);
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
}

export default Slot;
