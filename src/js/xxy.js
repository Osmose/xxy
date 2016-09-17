import PIXI from 'pixi.js';

const TILE_WIDTH = 8; // Pixels
const TILE_HEIGHT = 16; // Pixels
const SHEET_WIDTH = 32; // Tiles
const SHEET_HEIGHT = 8; // Tiles
const SCREEN_WIDTH = 80; // Tiles
const SCREEN_HEIGHT = 25; // TIles
const COLORS = {
  BLACK: '#000000',
  BLUE: '#0000AA',
  GREEN: '#00AA00',
  CYAN: '#00AAAA',
  RED: '#AA0000',
  MAGENTA: '#AA00AA',
  BROWN: '#AA5500',
  LIGHT_GRAY: '#AAAAAA',
  GRAY: '#555555',
  LIGHT_BLUE: '#5555FF',
  LIGHT_GREEN: '#55FF55',
  LIGHT_CYAN: '#55FFFF',
  LIGHT_RED: '#FF5555',
  LIGHT_MAGENTA: '#FF55FF',
  YELLOW: '#FFFF55',
  WHITE: '#FFFFFF',
};

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

const $game = document.querySelector('#game');
const renderer = PIXI.autoDetectRenderer(
  SCREEN_WIDTH * TILE_WIDTH, SCREEN_HEIGHT * TILE_HEIGHT
);
$game.appendChild(renderer.view);

const stage = new PIXI.Container();

PIXI.loader.add('img/code_page_437_transparent.png').load(setup);

class Display {
  constructor(baseTexture) {
    this.textures = {};
    for (const foreground of Object.keys(COLORS)) {
      this.textures[foreground] = {};
      for (const background of Object.keys(COLORS)) {
        const colorTexture = generateColorTexture(
            baseTexture,
            COLORS[foreground],
            COLORS[background]
        );
        this.textures[foreground][background] = generateTileTextures(colorTexture);
      }
    }

    this.foreground = 'WHITE';
    this.background = 'BLACK';

    this.sprites = [];
    for (let y = 0; y < SCREEN_HEIGHT; y++) {
      for (let x = 0; x < SCREEN_WIDTH; x++) {
        const sprite = new PIXI.Sprite(this.textures[0]);
        sprite.x = x * TILE_WIDTH;
        sprite.y = y * TILE_HEIGHT;
        this.sprites.push(sprite);
        stage.addChild(sprite);
      }
    }
  }

  spriteIndex(x, y) {
    return (y * SCREEN_WIDTH) + x;
  }

  setTile(x, y, index, foreground = this.foreground, background = this.background) {
    const texture = this.textures[foreground][background][index];
    this.sprites[this.spriteIndex(x, y)].texture = texture;
  }
}

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

function setup() {
  const baseTexture = PIXI.loader.resources['img/code_page_437_transparent.png'].texture;
  const display = new Display(baseTexture);

  const text = 'Hello, how are you?';
  for (let k = 0; k < text.length; k++) {
    const index = text.charCodeAt(k);
    display.setTile(k, 0, index, 'WHITE', 'BLUE');
  }
  renderer.render(stage);
}
