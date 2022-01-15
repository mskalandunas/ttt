'use strict';

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
function GameModule(size) {
  new State(getInitialState({
    currentTurn: null,
    players: getPlayerNames(),
    size
  }), updateView);
}

function initialize() {
  new GameModule(DEFAULT_GAME_SIZE);
}

function validate(board, size) {
  // check columns
  for (let i = 0; i < size; i++) {
    const columnSet = new Set([board[i]]);

    for (let j = 0; j < board.length; j += size) {
      columnSet.add(board[j]);
    }

    if (columnSet.size === 1) {
      return true;
    }
  }

  // check rows
  for (let i = 0; i < board.length; i += size) {
    const rowSet = new Set([board[i]]);
    
    for (let j = 0; j < size; j++) {
      rowSet.add(board[j]);
    }

    if (rowSet.size === 1) {
      return true;
    }
  }

  return  false;
}

function updateBoard(board, index, currentTurn) {
  return [
    ...board.slice(0, index),
    currentTurn ? 'X' : 'O',
    ...board.slice(index + 1, board.length)
  ];
}

function updateState(state) {
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