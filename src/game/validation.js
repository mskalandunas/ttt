export const validate = (board, size) => {
  // check columns
  for (let i = 0; i < size; i++) {
    const columnSet = new Set([board[i]]);

    for (let j = 0; j < board.length; j += size) {
      columnSet.add(board[j]);
    }

    if (columnSet.size === 1) {
      return !![...columnSet].filter(Boolean).length;
    }
  }

  // check rows
  for (let i = 0; i < board.length; i += size) {
    const rowSet = new Set([board[i]]);

    for (let j = 0; j < size; j++) {
      rowSet.add(board[j]);
    }

    if (rowSet.size === 1) {
      return !![...rowSet].filter(Boolean).length;
    }
  }

  const topDiagonal = new Set();
  const bottomDiagonal = new Set();

  for (let i = 0, j = 0; i < board.length; i += size, j++) {
    topDiagonal.add(board[i + j]);
    bottomDiagonal.add(board[board.length - (size + i - j)]);
  }

  if (topDiagonal.size === 1 || bottomDiagonal.size === 1) {
    return !!(
      [...topDiagonal].filter(Boolean).length ||
      [...bottomDiagonal].filter(Boolean).length
    );
  }

  return false;
};
