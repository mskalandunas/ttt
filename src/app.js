import {
  COMPUTER_PLAYER_NAME,
  GAME_CONTAINER,
  PLAYER_ONE_LABEL,
  PLAYER_TWO_LABEL
} from './constants';
import { removeAllChildNodes } from './utils';
import { State } from './state';

const getTextFromDOM = selector =>
  document.querySelector(selector).textContent;

const getPlayerNames = () =>
  [PLAYER_ONE_LABEL, PLAYER_TWO_LABEL].map(getTextFromDOM);

/* Business logic */
const createBoardState = size =>
  new Array(size).fill(null);

const getInitialTurn = () => Math.round(Math.random());

const setPlayerName = name => name || COMPUTER_PLAYER_NAME;

const getInitialState = ({ players, size }) => ({
  board: createBoardState(size * size),
  currentTurn: getInitialTurn(),
  players: players.map(setPlayerName),
});

/* Game */
export const createGame = size => {
  new State(getInitialState({
    currentTurn: null,
    players: getPlayerNames(),
    size
  }), updateView);
};

const updateBoard = (board, index, currentTurn) => [
  ...board.slice(0, index),
  currentTurn ? 'X' : 'O',
  ...board.slice(index + 1, board.length)
];

const updateView = state => {
  const boardFragment = new DocumentFragment();

  state.getState().board.forEach(function(value, i) {
    const button = document.createElement('button');

    button.innerHTML = value;

    button.addEventListener('click', function() {
      if (!value) {
        state.setState(currentState => {
          return ({
          ...currentState,
          board: updateBoard(currentState.board, i, currentState.currentTurn),
          currentTurn: Number(!currentState.currentTurn)
        })});
      }
    });
    boardFragment.appendChild(button);
  });

  const containerRef = document.getElementById(GAME_CONTAINER)

  removeAllChildNodes(containerRef);

  containerRef.appendChild(boardFragment);
}
