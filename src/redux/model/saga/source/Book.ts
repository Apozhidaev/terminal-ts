import Slot from './Slot';
import Link from './Link';

class Book {
  public slots: Slot[];
  public links: Link[];

  constructor({ slots, links }: Book) {
    this.slots = slots.map((slot) => new Slot(slot));
    this.links = links.map((link) => new Link(link));
  }
}

export default Book;
