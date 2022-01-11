(function() {
  'use strict';

  function updateName(evt) {
    document
      .querySelector(`[for=${evt.target.id}]`)
      .innerHTML = evt.target.value;
  }

  /* DOM */
  document
    .getElementById('Player1NameInput')
    .addEventListener('blur', updateName);
    document
    .getElementById('Player2NameInput')
    .addEventListener('blur', updateName);
})();