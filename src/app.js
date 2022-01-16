import {
  COMPUTER_PLAYER_NAME,
  GAME_CONTAINER,
  PLAYER_ONE_LABEL,
  PLAYER_TWO_LABEL
} from './constants';
import { removeAllChildNodes } from './utils';
import { State } from './state';

function getTextFromDOM(selector) {
  return document.querySelector(selector).textContent;
}

function getPlayerNames() {
  return [PLAYER_ONE_LABEL, PLAYER_TWO_LABEL].map(getTextFromDOM);
}

/* Business logic */
function createBoardState(size) {
  return new Array(size).fill(null);
}

function getInitialTurn() {
  return Math.round(Math.random());
}

function setPlayerName(name) {
  return name || COMPUTER_PLAYER_NAME;
}

function getInitialState({ players, size }) {
  return {
    board: createBoardState(size * size),
    currentTurn: getInitialTurn(),
    players: players.map(setPlayerName),
  };
}

/* Game */
export function GameModule(size) {
  new State(getInitialState({
    currentTurn: null,
    players: getPlayerNames(),
    size
  }), updateView);
}

function updateBoard(board, index, currentTurn) {
  return [
    ...board.slice(0, index),
    currentTurn ? 'X' : 'O',
    ...board.slice(index + 1, board.length)
  ];
}

function updateView(state) {
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
