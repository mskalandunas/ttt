import { DEFAULT_GAME_SIZE } from "./constants";
import { State } from "../utils";
import { getInitialState } from "./state-management";

export const createGame = (players, viewUpdater, size = DEFAULT_GAME_SIZE) => {
  new State(
    getInitialState({
      currentTurn: null,
      players,
      size,
    }),
    viewUpdater
  );
};
