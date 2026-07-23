export interface Position {
  x: number;
  y: number;
}

export function generateFlowerPositions(
  flowerSize: number,
  vw: number,
  vh: number,
): Position[] {
  const spacingX = flowerSize * 0.6;
  const spacingY = flowerSize * 0.6;
  const startX = -flowerSize / 2;
  const startY = -flowerSize / 2;
  const cols = Math.ceil((vw + flowerSize) / spacingX) + 1;
  const rows = Math.ceil((vh + flowerSize) / spacingY) + 1;

  const positions: Position[] = [];
  for (let row = 0; row < rows; row++) {
    const isOdd = row % 2 === 1;
    for (let c = 0; c < cols; c++) {
      const xPx = startX + c * spacingX + (isOdd ? spacingX / 2 : 0);
      const yPx = startY + row * spacingY;
      positions.push({ x: xPx, y: yPx });
    }
  }
  return positions;
}

const PADDING = 20;
const GAP = 20;
const CELL_W = 1244;
const CELL_H = 1110;
const COLS = 3;
const SPRITE_W = 3812;
const SPRITE_H = 3410;
const SPRITE_SRC = '/flowers/flowers-grid.webp';

function getSpriteStyle(flowerIndex: number, displayWidth: number) {
  const col = flowerIndex % COLS;
  const row = Math.floor(flowerIndex / COLS);
  const contentW = CELL_W - 2;
  const contentH = CELL_H - 2;
  const cellX = PADDING + col * (CELL_W + GAP) + 1;
  const cellY = PADDING + row * (CELL_H + GAP) + 1;
  const scale = displayWidth / contentW;
  const displayHeight = contentH * scale;

  return {
    width: `${displayWidth}px`,
    height: `${displayHeight}px`,
    backgroundImage: `url(${SPRITE_SRC})`,
    backgroundRepeat: 'no-repeat' as const,
    backgroundPosition: `${-(cellX * scale)}px ${-(cellY * scale)}px`,
    backgroundSize: `${SPRITE_W * scale}px ${SPRITE_H * scale}px`,
  };
}

export function createFlowerElements(
  positions: Position[],
  container: HTMLElement,
  center: Position,
  flowerIndices: number[],
  flowerSize: number,
): HTMLElement[] {
  return positions.map((pos, i) => {
    const idx = flowerIndices[i % flowerIndices.length];
    const spinDur = 2.5 + ((i * 3.7) % 1) * 4;
    const dx = pos.x - center.x + 50;
    const dy = pos.y - center.y + 60;
    const style = getSpriteStyle(idx, flowerSize);

    const el = document.createElement('div');
    el.className = 'absolute';
    el.style.width = style.width;
    el.style.height = style.height;
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.style.backgroundImage = style.backgroundImage;
    el.style.backgroundRepeat = style.backgroundRepeat;
    el.style.backgroundPosition = style.backgroundPosition;
    el.style.backgroundSize = style.backgroundSize;
    el.style.transform = `translate(${center.x - pos.x}px, ${center.y - pos.y}px) scale(0.3) translate(-50%, -50%)`;
    el.style.opacity = '0';
    el.style.willChange = 'transform, opacity';
    el.style.filter = 'drop-shadow(0 2px 6px rgba(80, 20, 40, 0.2))';
    el.style.pointerEvents = 'none';
    el.style.zIndex = String(Math.floor((i * 2.3) % 10));

    el.dataset.dx = String(dx);
    el.dataset.dy = String(dy);
    el.dataset.spinDur = String(spinDur);

    container.appendChild(el);
    return el;
  });
}

export function triggerBurst(
  elements: HTMLElement[],
  burstDuration: number,
): void {
  const maxDist = Math.sqrt(
    Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2),
  );

  elements.forEach((el) => {
    const dx = parseFloat(el.dataset.dx ?? '0');
    const dy = parseFloat(el.dataset.dy ?? '0');
    const spinDur = parseFloat(el.dataset.spinDur ?? '2.5');
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDist = distance / maxDist;
    const stagger = normalizedDist * 1000;

    el.style.transition = [
      `transform ${burstDuration}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${stagger}ms`,
      `opacity ${burstDuration * 0.6}ms ease ${stagger}ms`,
    ].join(', ');
    el.style.transform = 'translate(0, 0) scale(1) translate(0, 0)';
    el.style.opacity = '1';
    el.style.animation = `spin-flower ${spinDur}s linear infinite`;
  });
}
