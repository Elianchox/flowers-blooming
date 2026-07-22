export interface Flower {
  slug: string;
  name: string;
  spriteIndex: number;
}

const FLOWER_MAP: Array<{ slug: string; name: string }> = [
  { slug: 'pink_hydrangea', name: 'Pink Hydrangea' },
  { slug: 'pink_lily', name: 'Pink Lily' },
  { slug: 'pink_magnolia', name: 'Pink Magnolia' },
  { slug: 'pink_plumeria', name: 'Pink Plumeria' },
  { slug: 'pink_ranunculus', name: 'Pink Ranunculus' },
  { slug: 'pink_rose', name: 'Pink Rose' },
  { slug: 'red_peony', name: 'Red Peony' },
  { slug: 'white_peony', name: 'White Peony' },
  { slug: 'white_rose', name: 'White Rose' },
];

const files: Flower[] = FLOWER_MAP.map((f, i) => ({
  slug: f.slug,
  name: f.name,
  spriteIndex: i,
}));

export const FLOWERS: Record<string, Flower> = Object.fromEntries(
  files.map((f) => [f.slug, f]),
);

export const FLOWER_LIST: Flower[] = files;
