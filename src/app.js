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
function GameModule(size) {
  const state = new State(getInitialState({
    players: getPlayerNames(),
    size
  }), console.log);

  createGameBoard(state);
}

function initialize() {
  new GameModule(DEFAULT_GAME_SIZE);
}

function updateBoard(board, index, value) {
  return [
    ...board.slice(0, index),
    { ...board[index], value },
    ...board.slice(index + 1, board.length)
  ];
}

function createGameBoard(state) {
  const boardFragment = new DocumentFragment();

  state.getState().board.forEach(function(cell, i) {
    const button = document.createElement('button');

    button.addEventListener('click', function() {
      if (!this.textContent) {
        const value = state.getState().currentTurn ? 'X' : 'O';
        
        this.innerText = value;

        state.setState(state => {
          return ({
          ...state,
          board: updateBoard(state.board, i, value),
          currentTurn: Number(!state.currentTurn)
        })});
      }
    });
    boardFragment.appendChild(button);

    cell.ref = button;
  });

  document.getElementById(GAME_CONTAINER).appendChild(boardFragment);
}