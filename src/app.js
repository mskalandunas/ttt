(function() {
  'use strict';

  /* Selectors */
  const PLAYER_ONE_INPUT = 'Player1NameInput';
  const PLAYER_TWO_INPUT = 'Player2NameInput';
  const PlAYER_ONE_LABEL = `[for=${PLAYER_ONE_INPUT}]`;
  const PLAYER_TWO_LABEL = `[for=${PLAYER_TWO_INPUT}]`;
  const START_BUTTON = 'StartGame';

  const state = {
    currentTurn: 0,
    players: [null, null]
  };

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
    .addEventListener('click', start);
})();