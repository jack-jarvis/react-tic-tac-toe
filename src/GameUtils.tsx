import { BoardState, PlayerSymbol } from "./Types";

export const otherPlayer = (symbol: PlayerSymbol): PlayerSymbol => {
  return symbol === "X" ? "O" : "X";
};

export const getWinnerFromBoardState = (
  boardState: BoardState
): PlayerSymbol | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const symbols = lines[i].map((n) => boardState[n]);
    if (symbols[0] !== "" && symbols.every((s) => s === symbols[0])) {
      return symbols[0];
    }
  }

  return null;
};
