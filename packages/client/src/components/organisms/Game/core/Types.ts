export type GamePhase = 'SETUP' | 'BATTLE'
export type cellType = 'empty' | 'ship' | 'miss' | 'hited'
export type selectedShip = {
  coords: coordsType
  length: number
  direction: 'row' | 'column'
}

export type coordsType = {
  x: number
  y: number
}

export interface IGameStore {
  phase: GamePhase
  playerBoard: cellType[][]
  enemyBoard: cellType[][]
  selectedShip: selectedShip | null
  currentTurn: 'PLAYER' | 'ENEMY'
  shipsToPlace: number[]
  message: string
  score: number
}
export type onFinishData = {
  result: 'win' | 'lose'
  score: number
}
