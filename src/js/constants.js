export const TILE_WIDTH = 8; // Pixels
export const TILE_HEIGHT = 16; // Pixels
export const SHEET_WIDTH = 32; // Tiles
export const SHEET_HEIGHT = 8; // Tiles
export const SCREEN_WIDTH = 80; // Tiles
export const SCREEN_HEIGHT = 25; // TIles
export const BOARD_WIDTH = 60; // Tiles
export const BOARD_HEIGHT = 25; // Tiles
export const COLORS = {
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
COLORS[0x0] = COLORS.BLACK;
COLORS[0x1] = COLORS.BLUE;
COLORS[0x2] = COLORS.GREEN;
COLORS[0x3] = COLORS.CYAN;
COLORS[0x4] = COLORS.RED;
COLORS[0x5] = COLORS.MAGENTA;
COLORS[0x6] = COLORS.BROWN;
COLORS[0x7] = COLORS.LIGHT_GRAY;
COLORS[0x8] = COLORS.GRAY;
COLORS[0x9] = COLORS.LIGHT_BLUE;
COLORS[0xA] = COLORS.LIGHT_GREEN;
COLORS[0xB] = COLORS.LIGHT_CYAN;
COLORS[0xC] = COLORS.LIGHT_RED;
COLORS[0xD] = COLORS.LIGHT_MAGENTA;
COLORS[0xE] = COLORS.YELLOW;
COLORS[0xF] = COLORS.WHITE;
export const ELEMENTS = {
  0x00: 0x00,           // Empty Space
  0x01: 0x00,           // Special: acts like edge of board
  0x04: 0x02,           // Player
  0x05: 0x84,           // Ammo
  0x06: 0x9D,           // Torch
  0x07: 0x04,           // Gem
  0x08: 0x0C,           // Key
  0x09: 0x0A,           // Door
  0x0A: 0xE8,           // Scroll
  0x0B: 0xF0,           // Passage
  0x0C: 0x00, // (growing O)  // Duplicator
  0x0D: 0x0B,           // Bomb
  0x0E: 0x7F,           // Energizer
  0x0F: '/'.charCodeAt(0),      // Star
  0x10: '/'.charCodeAt(0),      // Clockwise conveyer
  0x11: '/'.charCodeAt(0),      // Counterclockwise conveyor
  0x12: 0xF8,           // Bullet
  0x13: 0xB0,           // Water
  0x14: 0xB0,           // Forest
  0x15: 0xDB,           // Solid
  0x16: 0xD2,           // Normal
  0x17: 0xB1,           // Breakable
  0x18: 0xFF,           // Boulder
  0x19: 0x12,           // Slider: North-South
  0x1A: 0x1D,           // Slider: East-West
  0x1B: 0xB2,           // Fake
  0x1C: 0x00,           // Invisible wall
  0x1D: 0x00,     // Blink Wall
  0x1E: 0x0,     // Transporter
  0x1F: 0x0,     // Line
  0x20: 0x2A,           // Ricochet
  0x21: 0xCD,           // Horizontal blink wall ray
  0x22: 0x99,           // Bear
  0x23: 0x05,           // Ruffian
  0x24: 0x0,     // Object
  0x25: 0x2A,           // Slime
  0x26: 0x5E,           // Shark
  0x27: 0x0,      // Spinning gun
  0x28: 0x0,     // Pusher
  0x29: 0xEA,           // Lion
  0x2A: 0xE3,           // Tiger
  0x2B: 0xBA,           // Vertical blink wall ray
  0x2C: 0xE9,           // Centipede head
  0x2D: 0x4F,           // Centipede segment
  0x2F: { type: 'text', color: COLORS.LIGHT_BLUE },   // | (set in colour byte) | Blue text
  0x30: { type: 'text', color: COLORS.LIGHT_GREEN },   // | (set in colour byte) | Green text
  0x31: { type: 'text', color: COLORS.CYAN },   // | (set in colour byte) | Cyan text
  0x32: { type: 'text', color: COLORS.LIGHT_RED },   // | (set in colour byte) | Red text
  0x33: { type: 'text', color: COLORS.LIGHT_MAGENTA },   // | (set in colour byte) | Purple text
  0x34: { type: 'text', color: COLORS.YELLOW },   // | (set in colour byte) | Yellow text
  0x35: { type: 'text', color: COLORS.WHITE },   // | (set in colour byte) | White text
  0x36: { type: 'text', color: COLORS.WHITE },   // | (set in colour byte) | White blinking text
  0x37: { type: 'text', color: COLORS.LIGHT_BLUE },   // | (set in colour byte) | Blue blinking text
  0x38: { type: 'text', color: COLORS.LIGHT_GREEN },   // | (set in colour byte) | Green blinking text
  0x39: { type: 'text', color: COLORS.CYAN },   // | (set in colour byte) | Cyan blinking text
  0x3A: { type: 'text', color: COLORS.RED },   // | (set in colour byte) | Red blinking text
  0x3B: { type: 'text', color: COLORS.LIGHT_MAGENTA },   // | (set in colour byte) | Purple blinking text
  0x3C: { type: 'text', color: COLORS.YELLOW },   // | (set in colour byte) | Yellow blinking text
  0x3D: { type: 'text', color: COLORS.LIGHT_GRAY },   // | (set in colour byte) | Grey blinking text
};
