function composed(composedFn, fn) {
  return function(x) {
    return composedFn(fn(x));
  }
}

function compose(...fns) {
  return fns.reduce(composed);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}