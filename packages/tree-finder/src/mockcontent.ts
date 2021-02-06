/*----------------------------------------------------------------------------|
| Copyright (c) 2020, Max Klein
|
| This file is part of the tree-finder library, distributed under the terms of
| the BSD 3 Clause license. The full license can be found in the LICENSE file.
|----------------------------------------------------------------------------*/
import { Path, IContentRow } from "./content";
import { Random } from "./util";

const DIR_NAMES = [
  "able",
  "baker",
  "charlie",
  "dog",
  "easy",
  "fox",
  "george",
  "how",
  "item",
  "jig",
  "king",
  "love",
  "mike",
  "nan",
  "oboe",
  "peter",
  "queen",
  "roger",
  "sugar",
  "tare",
  "uncle",
  "victor",
  "william",
  "xray",
  "yoke",
  "zebra",
];

interface IMockContentRow extends IContentRow {
  modified: Date;

  writable: boolean;
}

let mockFileIx = 0;
let modDaysIx = -1;

export function mockContent(props: {path: Path, kind: string, modDays?: number, nchildren?: number, ndirectories?: number, randomize?: boolean}): IMockContentRow {
  // infinite recursive mock contents
  const {path, kind, modDays = modDaysIx++, nchildren = 100, ndirectories = 10, randomize = false} = props;
  const modified = new Date(modDays * 24 * 60 * 60 * 1000);
  const writable = randomize && Random.bool();

  if (kind === "dir") {
    // is a dir
    return {
      kind,
      path,
      modified,
      writable,
      getChildren: () => {
        const children = [];
        const dirNames = randomize ? Random.shuffle(DIR_NAMES) : DIR_NAMES;

        for (let i = 0; i < nchildren; i++) {
          children.push(mockContent({
            kind: i < ndirectories ? "dir" : "text",
            path: [...path, i < ndirectories ? `${dirNames[i]}` : `file_${`${mockFileIx++}`.padStart(7, '0')}.txt`],
            nchildren,
            ndirectories,
            randomize,
          }));
        }
        return children;
      },
    };
  } else {
    // is a file
    return {
      kind,
      path,
      modified,
      writable,
    };
  }
}
