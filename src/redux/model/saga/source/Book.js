import Slot from './Slot';
import Link from './Link';


class Book {
  constructor({ slots, links }) {
    this.slots = slots.map((slot) => new Slot(slot));
    this.links = links.map((link) => new Link(link));
  }
}

export default Book;
