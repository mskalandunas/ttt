import {
  DEFAULT_GAME_SIZE,
  PLAYER_ONE_INPUT,
  PLAYER_TWO_INPUT,
  START_BUTTON
} from './constants';
import { GameModule } from './app';
import { updateName } from './view';

function initialize() {
  new GameModule(DEFAULT_GAME_SIZE);
}

document
  .getElementById(START_BUTTON)
  .addEventListener('click', initialize);
document
  .getElementById(PLAYER_ONE_INPUT)
  .addEventListener('blur', updateName);
document
  .getElementById(PLAYER_TWO_INPUT)
  .addEventListener('blur', updateName);
