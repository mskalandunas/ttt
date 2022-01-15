function validate(state) {
  const { board, size } = state;

  // check columns
  for (let i = 0; i < size; i++) {
    const columnSet = new Set([board[i]]);

    for (let j = 0; j < board.length; j += size) {
      columnSet.add(board[j]);
    }

    if (columnSet.size === 1) {
      return true;
    }
  }

  // check rows
  for (let i = 0; i < board.length; i += size) {
    const rowSet = new Set([board[i]]);
    
    for (let j = 0; j < size; j++) {
      rowSet.add(board[j]);
    }
    
    if (rowSet.size === 1) {
      return true;
    }
  }

  return  false;
}
