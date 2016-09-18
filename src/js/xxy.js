import PIXI from 'pixi.js';
import MainLoop from 'mainloop.js';
import keymaster from 'keymaster';

import TextureStore from './TextureStore.js';
import Tilemap from './Tilemap.js';
import World from './World.js';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  TILE_WIDTH,
  TILE_HEIGHT,
  BOARD_WIDTH,
  ELEMENTS,
  COLORS,
} from './constants.js';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

const $game = document.querySelector('#game');
const renderer = PIXI.autoDetectRenderer(
  SCREEN_WIDTH * TILE_WIDTH, SCREEN_HEIGHT * TILE_HEIGHT
);
$game.appendChild(renderer.view);

const stage = new PIXI.Container();

PIXI.loader.add('img/code_page_437_transparent.png').load(setup);

let player = null;
let tilemap = null;

function setup() {
  const baseTexture = PIXI.loader.resources['img/code_page_437_transparent.png'].texture;
  const textureStore = new TextureStore(baseTexture);

  tilemap = new Tilemap(textureStore, SCREEN_WIDTH, SCREEN_HEIGHT);
  tilemap.setText(5, 5, 'Hello!');
  stage.addChild(tilemap);

  player = new PIXI.Sprite(textureStore.get(2, COLORS.WHITE, COLORS.BLUE), 0, 0);
  stage.addChild(player);
  renderer.render(stage);

  keymaster('left', () => {
    player.x -= TILE_WIDTH;
  });
  keymaster('right', () => {
    player.x += TILE_WIDTH;
  });
  keymaster('up', () => {
    player.y -= TILE_HEIGHT;
  });
  keymaster('down', () => {
    player.y += TILE_HEIGHT;
  });

  MainLoop.setUpdate(update).setDraw(draw).start();
}

function update() {
  // NOOP
}

function draw() {
  renderer.render(stage);
}

function loadWorld(buffer) {
  const world = new World(buffer);
  document.title = `${world.worldName} - ${world.boards[0].boardName}`;

  // Draw title
  let x = 0;
  let y = 0;
  for (const tile of world.boards[0].tiles) {
    const { count, element, color } = tile;
    for (let k = 0; k < count; k++) {
      let tileIndex = ELEMENTS[element];
      let foreground = COLORS[color & 0xF];
      let background = COLORS[((color & 0b01110000) >> 4) % 8];
      if (tileIndex.type === 'text') {
        tileIndex = color;
        foreground = tileIndex.color;
        background = COLORS.BLACK;
      }
      tilemap.setTile(x++, y, tileIndex, foreground, background);
      if (x >= BOARD_WIDTH) {
        x = 0;
        y++;
      }
    }
  }
}

document.getElementById('world-loader').addEventListener('change', event => {
  const files = event.target.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = readEvent => {
      loadWorld(readEvent.target.result);
    };
    reader.readAsArrayBuffer(files[0]);
  }
});
