import search from "../../../model/saga/search";
import { Slot, Book } from "../../../model/saga/source";

function getRoots(slots: Slot[], parents: Slot[][], archive: boolean) {
  const roots = slots.filter((issue) => issue.root);
  const notRoots = slots.filter((issue) => !issue.root);

  for (let i = 0; i < notRoots.length; i++) {
    if (!parents[notRoots[i].id] // todo optimization
      || !parents[notRoots[i].id].filter((item) => !!item.archive === archive).length) {
      roots.push(notRoots[i]);
    }
  }

  return roots.length ? roots : slots;
}

type FilterParams = {
  source: Book,
  parents: Slot[][],
  searchQuery: string,
  archive: boolean,
};

export function filter({
  source,
  parents,
  searchQuery,
  archive,
}: FilterParams): Slot[] {
  const slots = archive
    ? source.slots.filter((item) => item.archive)
    : source.slots.filter((item) => !item.archive);

  slots.sort((a, b) => b.id - a.id);

  const roots = searchQuery
    ? search(slots, searchQuery)
    : getRoots(slots, parents, archive);

  return roots;
}
