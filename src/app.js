'use strict';

/* Business logic */
function getDefaultCellShape() {
  return {
    ref: null,
    value: null
  };
}

function createBoardState(size) {
  return new Array(size).fill(getDefaultCellShape());
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
function initialize() {
  window.__STATE__ = new State(getInitialState({
    players: getPlayerNames(),
    size: DEFAULT_GAME_SIZE
  }), console.log);

  createGameBoard(__STATE__.getState().board);
}

function createGameBoard(boardValues) {
  const board = new DocumentFragment();

  boardValues.forEach(function(cell, i) {
    const button = document.createElement('button');

    button.addEventListener('click', function() {
      if (!this.textContent) {
        const currentState = __STATE__.getState();

        this.innerText = currentState.currentTurn ? 'X' : 'O';

        __STATE__.setState(state => {
          return ({
          ...state,
          currentTurn: state.currentTurn ? 0 : 1
        })});
      }
    });
    board.appendChild(button);

    cell.ref = button;
  });

  document.getElementById(GAME_CONTAINER).appendChild(board);
}

function viewManager(state, action) {
  switch (action.type) {
    case 'INITIALIZE':
        createGameBoard(state.getState().board);
      break;
    default:
  }
}