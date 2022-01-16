import { createGame } from "./game";
import { getPlayerNames, setupInitializer, updateView } from "./view/view";

const initialize = () => {
  createGame(getPlayerNames(), updateView);
};

setupInitializer(initialize);
