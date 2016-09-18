import PIXI from 'pixi.js';

import { COLORS, SHEET_HEIGHT, SHEET_WIDTH, TILE_WIDTH, TILE_HEIGHT } from './constants.js';

function generateTileTextures(texture) {
  const textures = [];
  for (let y = 0; y < SHEET_HEIGHT; y++) {
    for (let x = 0; x < SHEET_WIDTH; x++) {
      const rect = new PIXI.Rectangle(
        x * TILE_WIDTH,
        y * TILE_HEIGHT,
        TILE_WIDTH,
        TILE_HEIGHT
      );
      textures.push(new PIXI.Texture(texture, rect));
    }
  }
  return textures;
}

function generateColorTexture(texture, foregroundColor, backgroundColor) {
  const { width, height, source } = texture.baseTexture;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = foregroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(source, 0, 0);

  const foregroundCanvas = canvas;
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(foregroundCanvas, 0, 0);

  return PIXI.Texture.fromCanvas(canvas);
}

export default class TextureStore {
  constructor(baseTexture) {
    this.textures = {};
    for (const foreground of Object.values(COLORS)) {
      this.textures[foreground] = {};
      for (const background of Object.values(COLORS)) {
        const colorTexture = generateColorTexture(baseTexture, foreground, background);
        this.textures[foreground][background] = generateTileTextures(colorTexture);
      }
    }
  }

  get(index, foreground, background) {
    return this.textures[foreground][background][index];
  }
}
