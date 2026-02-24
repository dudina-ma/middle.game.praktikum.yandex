import { Store } from '../core/Store'
import { fireShot } from './FireShot'

describe('Game engine basics', () => {
  test('creates game with 10x10 boards', () => {
    const store = new Store()
    const state = store.getState()

    expect(state.playerBoard).toHaveLength(10)
    expect(state.playerBoard[0]).toHaveLength(10)
    expect(state.enemyBoard).toHaveLength(10)
    expect(state.enemyBoard[0]).toHaveLength(10)
  })

  test('returns hit for ship cell', () => {
    const board = Array.from({ length: 10 }, () =>
      Array(10).fill('empty' as const)
    )
    board[2][3] = 'ship'

    const result = fireShot({ x: 3, y: 2 }, board)

    expect(result.result).toBe('hit')
    expect(result.board[2][3]).toBe('hited')
  })

  test('returns miss for empty cell', () => {
    const board = Array.from({ length: 10 }, () =>
      Array(10).fill('empty' as const)
    )

    const result = fireShot({ x: 1, y: 1 }, board)

    expect(result.result).toBe('miss')
    expect(result.board[1][1]).toBe('miss')
  })

  test('prevents repeated shot to the same cell', () => {
    const board = Array.from({ length: 10 }, () =>
      Array(10).fill('empty' as const)
    )
    board[4][4] = 'ship'

    const firstShot = fireShot({ x: 4, y: 4 }, board)
    const secondShot = fireShot({ x: 4, y: 4 }, firstShot.board)

    expect(firstShot.result).toBe('hit')
    expect(secondShot.result).toBe('null')
    expect(secondShot.board[4][4]).toBe('hited')
  })
})
