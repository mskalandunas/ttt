import {
  COMPUTER_PLAYER_NAME,
  PLAYER_ONE_LABEL,
  PLAYER_TWO_LABEL,
} from "../constants";
import {
  createArrayWithSize,
  getTextFromDOM,
} from "../utils";

const updateBoard = (board, index, currentTurn) => [
  ...board.slice(0, index),
  currentTurn ? "X" : "O",
  ...board.slice(index + 1, board.length),
];

export const updateState = (index) => {
  return (state) => ({
    ...state,
    board: updateBoard(state.board, index, state.currentTurn),
    currentTurn: Number(!state.currentTurn),
    turn: (state.turn += 1),
  })
}

export const getPlayerNames = () =>
  [PLAYER_ONE_LABEL, PLAYER_TWO_LABEL].map(getTextFromDOM);

const getInitialTurn = () => Math.round(Math.random());

const setPlayerName = (name) => name || COMPUTER_PLAYER_NAME;

export const getInitialState = ({ players, size }) => ({
  board: createArrayWithSize(size * size),
  currentTurn: getInitialTurn(),
  players: players.map(setPlayerName),
  size,
  turn: 0,
});