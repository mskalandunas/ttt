(function() {
  'use strict';

  /* Selectors */
  const GAME_CONTAINER = 'GameBoard';
  const PLAYER_ONE_INPUT = 'Player1NameInput';
  const PLAYER_TWO_INPUT = 'Player2NameInput';
  const PlAYER_ONE_LABEL = `[for=${PLAYER_ONE_INPUT}]`;
  const PLAYER_TWO_LABEL = `[for=${PLAYER_TWO_INPUT}]`;
  const START_BUTTON = 'StartGame';

  /* Constants */
  const COMPUTER_PLAYER_NAME = 'Computer';
  const DEFAULT_GAME_SIZE = 3;

  const state = {
    currentTurn: 0,
    players: [null, null]
  };

  function getTextFromDOM(selector) {
    return document.querySelector(selector).textContent;
  }

  function getPlayerNames() {
    return [PlAYER_ONE_LABEL, PLAYER_TWO_LABEL].map(getTextFromDOM);
  }

  function setPlayerName(name) {
    return name || COMPUTER_PLAYER_NAME;
  }

  function getInitialState(players) {
    return {
      currentTurn: 0,
      players: players.map(setPlayerName)
    };
  }

  class State {
    constructor(initialState, subscriber) {
      this._state = initialState || {};
      this._subscriber = subscriber || null;
    }

    setState(stateSetter) {
      this._state = stateSetter(this._state);

      this._subscriber && this._subscriber(this._state);
    }
  }

  function initialize() {
    const state = new State(getInitialState(getPlayerNames()));

    console.log(state);
  }

  function createBoard(spaces = DEFAULT_GAME_SIZE) {
    const fragment = new DocumentFragment();
    

  }

  function start() {
    [
      PlAYER_ONE_LABEL,
      PLAYER_TWO_LABEL
    ].forEach((selector, i) => {
      const el = document.querySelector(selector);

      state.players[i] = el.textContent;

      el.setAttribute('disabled', true);
    });
  }

  function updateName(evt) {
    document
      .querySelector(`[for=${evt.target.id}]`)
      .innerHTML = evt.target.value;
  }

  /* DOM */
  document
    .getElementById(PLAYER_ONE_INPUT)
    .addEventListener('blur', updateName);
  document
    .getElementById(PLAYER_TWO_INPUT)
    .addEventListener('blur', updateName);
  document
    .getElementById(START_BUTTON)
    .addEventListener('click', initialize);
})();