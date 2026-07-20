import { readdirSync } from "node:fs";

export interface Flower {
  src: string;
  slug: string;
  name: string;
}

const files = readdirSync("public/flowers")
  .filter((f) => f.endsWith(".webp"))
  .map(
    (f): Flower => ({
      src: `/flowers/${f}`,
      slug: f.replace(".webp", ""),
      name: f
        .replace(".webp", "")
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    }),
  );

export const FLOWERS: Record<string, Flower> = Object.fromEntries(
  files.map((f) => [f.slug, f]),
);

export const FLOWER_LIST: Flower[] = files;
