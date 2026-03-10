import { BattleScene } from './BattleScene'
import { ControllerConstructor, GamePhase } from '../core/Types'
import { SetupScene } from './SetupScene'

export const ScenesScheme: Record<GamePhase, ControllerConstructor> = {
  BATTLE: BattleScene,
  SETUP: SetupScene,
}
