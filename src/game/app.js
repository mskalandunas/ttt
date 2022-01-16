import {
  State
} from "../utils";
import { getInitialState, getPlayerNames } from './state-management';

export const createGame = (size, viewUpdater) => {
  new State(
    getInitialState({
      currentTurn: null,
      players: getPlayerNames(),
      size,
    }),
    viewUpdater
  );
};
