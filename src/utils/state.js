export class State {
  #state;

  #subscriber;

  constructor(initialState, subscriber) {
    this.#subscriber = subscriber || null;

    this.setState(initialState || {});
  }

  getState() {
    return this.#state;
  }

  setState(updater) {
    this.#state =
      typeof updater === "function" ? updater(this.#state) : updater;

    this.#subscriber && this.#subscriber(this);

    return this;
  }
}
