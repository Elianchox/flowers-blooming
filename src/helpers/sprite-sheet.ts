export const SPRITE_SRC = '/flowers/flowers-grid.webp'

export const SPRITE_W = 3812
export const SPRITE_H = 3410
export const PADDING = 20
export const GAP = 20
export const CELL_W = 1244
export const CELL_H = 1110
export const COLS = 3
export const ROWS = 3
export const BORDER = 1

export const CELL_ORDER = [
  'pink_hydrangea',
  'pink_lily',
  'pink_magnolia',
  'pink_plumeria',
  'pink_ranunculus',
  'pink_rose',
  'red_peony',
  'white_peony',
  'white_rose',
] as const

export type FlowerSlug = (typeof CELL_ORDER)[number]

export interface SpriteCellStyle {
  width: string
  height: string
  backgroundImage: string
  backgroundRepeat: string
  backgroundPosition: string
  backgroundSize: string
}

export function getFlowerSpriteStyle(flowerIndex: number, displayWidth: number): SpriteCellStyle {
  const col = flowerIndex % COLS
  const row = Math.floor(flowerIndex / COLS)
  const contentW = CELL_W - 2 * BORDER
  const contentH = CELL_H - 2 * BORDER
  const cellX = PADDING + col * (CELL_W + GAP) + BORDER
  const cellY = PADDING + row * (CELL_H + GAP) + BORDER
  const scale = displayWidth / contentW
  const displayHeight = contentH * scale

  return {
    width: `${displayWidth}px`,
    height: `${displayHeight}px`,
    backgroundImage: `url(${SPRITE_SRC})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `${-(cellX * scale)}px ${-(cellY * scale)}px`,
    backgroundSize: `${SPRITE_W * scale}px ${SPRITE_H * scale}px`,
  }
}
