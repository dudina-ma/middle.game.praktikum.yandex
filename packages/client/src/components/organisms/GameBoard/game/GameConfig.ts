export const GAME_CONFIG = {
  CANVAS_SIZE: { x: 300, y: 700 },
  MESSAGES_POSITION: {
    x: 20,
    y: 20,
  },
  FPS: 60,
  DIVIDER_W: 2,
  PLAYER_BOARD_POSITION: { x: 40, y: 50 },
  ENEMY_BOARD_POSITION: { x: 40, y: 320 },
  CELL_SIZE: { x: 20, y: 20 },
  SHIPS_TO_PLACE: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
  colors: {
    empty: 'rgba(255, 255, 255, 0.5)',
    hited: 'rgba(255, 0, 0, 0.5)',
    ship: 'rgba(0, 0, 0, 0.5)',
    miss: 'rgba(0, 255, 4, 0.08)',
  },
} as const
