class State {
  constructor(initialState, subscriber) {
    this._subscriber = subscriber || null;
    this._state = this.setState(initialState || {});

    this.getState = this.getState.bind(this);
  }

  getState() {
    return this._state;
  }

  setState(updater) {
    this._state = typeof updater === 'function' 
      ? updater(this._state) 
      : updater;

    this._subscriber && this._subscriber(this);

    return this._state;
  }
}
