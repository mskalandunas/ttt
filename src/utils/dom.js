export const getTextFromDOM = (selector) =>
  document.querySelector(selector).textContent;

export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
