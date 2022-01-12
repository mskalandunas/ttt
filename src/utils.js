function composed(composedFn, fn) {
  return function(x) {
    return composedFn(fn(x));
  }
}

function compose(...fns) {
  return fns.reduce(composed);
}