import Resource from './Resource';
import Content from './Content';
import Link from './Link';
import Slot from './Slot';
import Book from './Book';

export type KeyValue = {
  time: number;
  key: string;
  value?: string;
};

export type Model = {
  source: Book;
  slots: Slot[];
  children: Slot[][];
  parents: Slot[][];
};

export type Fields = {
  [key: string]: any;
};

export { Resource, Content, Link, Slot, Book };
