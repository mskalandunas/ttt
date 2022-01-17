import {
  GAME_CONTAINER,
  PLAYER_ONE_INPUT,
  PLAYER_TWO_INPUT,
  PLAYER_ONE_LABEL,
  PLAYER_TWO_LABEL,
  START_BUTTON,
} from "./constants";
import { getTextFromDOM, removeAllChildNodes } from "./dom";
import { validate } from "../game/validation";
import { updateState } from "../game";

export const getPlayerNames = () =>
  [PLAYER_ONE_LABEL, PLAYER_TWO_LABEL].map(getTextFromDOM);

const updateName = (evt) => {
  document.querySelector(`[for=${evt.target.id}]`).innerHTML = evt.target.value;
};

export const setupListeners = () => {
  document
    .getElementById(PLAYER_ONE_INPUT)
    .addEventListener("blur", updateName);
  document
    .getElementById(PLAYER_TWO_INPUT)
    .addEventListener("blur", updateName);
};

export const setupInitializer = (initializer) => {
  document.getElementById(START_BUTTON).addEventListener("click", initializer);
};

// TODO: don't pass in state class here, just current state
export const updateView = (state) => {
  const boardFragment = new DocumentFragment();

  state.getState().board.forEach(function (value, i) {
    const button = document.createElement("button");
    const { board, currentTurn, size, turn } = state.getState();

    button.innerHTML = value;

    if (turn > size * 2 - 1) {
      if (validate(board, size)) {
        alert(`${currentTurn ? "X" : "O"} wins!`);
        return;
      }

      if (board.filter(Boolean).length === size * size) {
        alert("DRAW");
        return;
      }
    }

    button.addEventListener("click", function () {
      if (!value) {
        state.setState(updateState(i));
      }
    });
    boardFragment.appendChild(button);
  });

  const containerRef = document.getElementById(GAME_CONTAINER);

  removeAllChildNodes(containerRef);

  containerRef.appendChild(boardFragment);
};
