import { COMPUTER_PLAYER_NAME } from "./constants";
import { createArrayWithSize } from "./utils";

const updateBoard = (board, index, currentTurn) =>
  board
    .slice(0, index)
    .concat(currentTurn ? "X" : "O", board.slice(index + 1, board.length));

const getInitialTurn = () => Math.round(Math.random());

const setPlayerName = (name) => name || COMPUTER_PLAYER_NAME;

export const updateState = (index) => (state) => ({
  ...state,
  board: updateBoard(state.board, index, state.currentTurn),
  currentTurn: Number(!state.currentTurn),
  turn: (state.turn += 1),
});

export const getInitialState = ({ players, size }) => ({
  board: createArrayWithSize(size * size),
  currentTurn: getInitialTurn(),
  players: players.map(setPlayerName),
  size,
  turn: 0,
});
