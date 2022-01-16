import {
  GAME_CONTAINER,
} from "./constants";
import {
  removeAllChildNodes,
} from "./utils";
import { validate } from "./validation";
import { updateState } from './game';

export const updateName = (evt) => {
  document.querySelector(`[for=${evt.target.id}]`).innerHTML = evt.target.value;
};

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
