import { useState } from "react";
import { BoardState, PlayerSymbol } from "./Types";

interface HistoryEntry {
  move: Move | null;
  squares: BoardState;
}

interface Move {
  square: number;
  player: PlayerSymbol;
}

const emptyBoard = Array(9).fill("");

const otherPlayer = (symbol: PlayerSymbol): PlayerSymbol => {
  return symbol === "X" ? "O" : "X";
};

export default function useGameState() {
  const [nextPlayer, setNextPlayer] = useState<PlayerSymbol>("X");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      move: null,
      squares: emptyBoard,
    },
  ]);

  const getCurrentState = () => {
    return history[history.length - 1].squares;
  };

  const makeMove = (i: number) => {
    if (getWinner()) return;

    const squares = getCurrentState().slice();
    if (squares[i] === "") {
      squares[i] = nextPlayer;
      const newHistory = history.slice();
      newHistory.push({
        move: {
          square: i,
          player: nextPlayer,
        },
        squares: squares,
      });
      setNextPlayer(otherPlayer(nextPlayer));
      setHistory(newHistory);
    }
  };

  const getWinner = (): PlayerSymbol | null => {
    const squares = getCurrentState();
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
      const symbols = lines[i].map((n) => squares[n]);
      if (symbols[0] !== "" && symbols.every((s) => s === symbols[0])) {
        return symbols[0];
      }
    }

    return null;
  };

  return [nextPlayer, history, getCurrentState, makeMove, getWinner] as const;
}
