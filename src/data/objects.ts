import { readdirSync } from "node:fs";

export interface ObjectImage {
  src: string;
  slug: string;
  name: string;
}

const files = readdirSync("public/objects")
  .filter((f) => f.endsWith(".webp"))
  .map(
    (f): ObjectImage => ({
      src: `/objects/${f}`,
      slug: f.replace(".webp", ""),
      name: f
        .replace(".webp", "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    }),
  );

export const OBJECTS: Record<string, ObjectImage> = Object.fromEntries(
  files.map((f) => [f.slug, f]),
);

export const OBJECT_LIST: ObjectImage[] = files;
