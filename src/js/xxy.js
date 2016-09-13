import PIXI from 'pixi.js';

PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

const $game = document.querySelector('#game');
const renderer = PIXI.autoDetectRenderer(256, 256);
$game.appendChild(renderer.view);

const stage = new PIXI.Container();

PIXI.loader.add('img/code_page_437.png').load(setup);

function setup() {
  const sprite = new PIXI.Sprite(
    PIXI.loader.resources['img/code_page_437.png'].texture
  );
  stage.addChild(sprite);
  renderer.render(stage);
}
