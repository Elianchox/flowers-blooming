import { readdirSync } from "node:fs";

type FileNames = 'envelope-closed.webp' | 'envelope-opened.webp'

export interface ObjectImage {
  src: string;
  name: FileNames;
}

const files = readdirSync("public/objects")
  .filter((f) => f.endsWith(".webp"))
  .map(
    (f): ObjectImage => ({
      src: `/objects/${f}`,
      name: f as FileNames,
    }),
  );

export const OBJECTS: Record<string, ObjectImage> = Object.fromEntries(
  files.map((f) => [f.name, f]),
);

export const OBJECT_LIST: ObjectImage[] = files;
