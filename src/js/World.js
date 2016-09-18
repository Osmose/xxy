import { cachedProperty, readStringFromView } from './utils.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class Board {
  constructor(buffer) {
    this.data = new DataView(buffer);

    this.tiles = [];
    let tileCount = 0;
    let offset = 0x35;
    while (tileCount < BOARD_WIDTH * BOARD_HEIGHT) {
      const count = this.data.getUint8(offset++);
      const element = this.data.getUint8(offset++);
      const color = this.data.getUint8(offset++);
      this.tiles.push({ count, element, color });
      tileCount += count;
    }
  }

  @cachedProperty
  get boardSize() {
    // Add the 2 bytes from this value for the true board size.
    return this.data.getInt16(0, true) + 2;
  }

  @cachedProperty
  get boardName() {
    const length = this.data.getUint8(0x2);
    return readStringFromView(this.data, 0x3, length);
  }
}

export default class World {
  constructor(buffer) {
    this.data = new DataView(buffer);

    this.boards = [];
    let offset = 0x200;
    for (let k = 0; k < this.numBoards; k++) {
      const length = this.data.getInt16(offset, true);
      const boardBuffer = buffer.slice(offset, offset + length + 2);
      this.boards.push(new Board(boardBuffer));
      offset += length + 2;
    }
  }

  @cachedProperty
  get worldName() {
    const length = this.data.getUint8(0x1D);
    return readStringFromView(this.data, 0x1E, length);
  }

  @cachedProperty
  get numBoards() {
    return this.data.getInt16(0x2, true);
  }
}
