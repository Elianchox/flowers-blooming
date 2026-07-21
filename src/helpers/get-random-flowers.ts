import { FLOWER_LIST } from '../data/flowers';

function randomFlowerSrc() {
  const randomIndex = Math.floor(Math.random() * FLOWER_LIST.length);
  return FLOWER_LIST[randomIndex].src;
}

export default randomFlowerSrc;
