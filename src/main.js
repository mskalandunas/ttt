import { createGame } from "./game";
import { getPlayerNames, setupInitializer, updateView } from "./browser";

const initialize = () => {
  createGame(getPlayerNames(), updateView);
};

setupInitializer(initialize);
