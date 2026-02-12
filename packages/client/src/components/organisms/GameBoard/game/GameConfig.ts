export const GAME_CONFIG = {
  CANVAS_SIZE: { x: 300, y: 700 },
  MESSAGES_POSITION: {
    x: 20,
    y: 20,
  },
  FPS: 60,
  DIVIDER_W: 2,
  CELL_SIZE: { x: 20, y: 20 },
  BOARDS_POSITION: {
    PLAYER_BOARD_POSITION: { x: 40, y: 50, w: 220, h: 220 },
    ENEMY_BOARD_POSITION: { x: 40, y: 320, w: 220, h: 220 },
  },

  SHIPS_TO_PLACE: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
  colors: {
    empty: 'rgba(51, 37, 206, 0.5)',
    hited: 'rgba(255, 0, 0, 0.5)',
    ship: 'rgba(0, 0, 0, 0.5)',
    miss: 'rgba(0, 255, 4, 0.08)',
  },
} as const
