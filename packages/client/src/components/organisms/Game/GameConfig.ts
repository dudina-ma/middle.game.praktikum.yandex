export const GAME_CONFIG = {
  CANVAS_SIZE: { x: 700, y: 300 },
  MESSAGES_POSITION: {
    x: 20,
    y: 20,
  },
  FPS: 60,
  AI_THINKING: 1300,
  DIVIDER_W: 2,
  CELL_SIZE: { x: 20, y: 20 },
  BOARDS_POSITION: {
    PLAYER_BOARD_POSITION: { x: 40, y: 50, w: 220, h: 220 },
    ENEMY_BOARD_POSITION: { x: 320, y: 50, w: 220, h: 220 },
  },

  SHIPS_TO_PLACE: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
  shipSprites: {
    1: '/assets/ships/ship-1.png',
    2: '/assets/ships/ship-2.png',
    3: '/assets/ships/ship-3.png',
    4: '/assets/ships/ship-4.png',
  } as const,
  hitSprite: '/assets/hit.png',
  colors: {
    busy: 'rgba(0, 0, 0, 0)',
    empty: 'rgba(51, 37, 206, 0.5)',
    hited: 'rgba(255, 0, 0, 0.5)',
    ship: 'rgba(0, 0, 0, 0.5)',
    miss: 'rgba(0, 255, 4, 0.08)',
  },
} as const
