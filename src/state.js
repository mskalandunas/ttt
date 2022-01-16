export class State {
  #state = null; 

  constructor(initialState, subscriber) {
    this._subscriber = subscriber || null;
    
    this.setState(initialState || {});
  }

  getState() {
    return this.#state;
  }

  setState(updater) {
    this.#state = typeof updater === 'function' 
      ? updater(this.#state) 
      : updater;

    this._subscriber && this._subscriber(this);

    return this;
  }
}
