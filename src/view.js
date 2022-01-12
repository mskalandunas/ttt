function getTextFromDOM(selector) {
  return document.querySelector(selector).textContent;
}

function getPlayerNames() {
  return [PlAYER_ONE_LABEL, PLAYER_TWO_LABEL].map(getTextFromDOM);
}

function updateName(evt) {
  document
    .querySelector(`[for=${evt.target.id}]`)
    .innerHTML = evt.target.value;
}

document
  .getElementById(PLAYER_ONE_INPUT)
  .addEventListener('blur', updateName);
document
  .getElementById(PLAYER_TWO_INPUT)
  .addEventListener('blur', updateName);
document
  .getElementById(START_BUTTON)
  .addEventListener('click', initialize);