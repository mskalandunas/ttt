export const updateName = evt => {
  document
    .querySelector(`[for=${evt.target.id}]`)
    .innerHTML = evt.target.value;
}
