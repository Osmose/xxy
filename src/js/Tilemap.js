import PIXI from 'pixi.js';

import { TILE_WIDTH, TILE_HEIGHT, COLORS } from './constants.js';

export default class Tilemap extends PIXI.Container {
  constructor(textureStore, width, height) {
    super();

    this.textureStore = textureStore;
    this.mapWidth = width;
    this.mapHeight = height;
    this.foreground = COLORS.WHITE;
    this.background = COLORS.BLACK;

    this.sprites = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const sprite = new PIXI.Sprite(this.textureStore[0]);
        sprite.x = x * TILE_WIDTH;
        sprite.y = y * TILE_HEIGHT;
        this.sprites.push(sprite);
        this.addChild(sprite);
      }
    }
  }

  spriteIndex(x, y) {
    return (y * this.mapWidth) + x;
  }

  setText(x, y, text, foreground = this.foreground, background = this.background) {
    for (let k = 0; k < text.length; k++) {
      const index = text.charCodeAt(k);
      this.setTile(x + k, y, index, foreground, background);
    }
  }

  setTile(x, y, index, foreground = this.foreground, background = this.background) {
    const texture = this.textureStore.get(index, foreground, background);
    this.sprites[this.spriteIndex(x, y)].texture = texture;
  }
}
