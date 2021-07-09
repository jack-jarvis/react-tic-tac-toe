import { useState } from "react";
import { getWinnerFromBoardState, otherPlayer } from "./GameUtils";
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

  const getWinner = () => {
    return getWinnerFromBoardState(getCurrentState());
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

  return [nextPlayer, history, getCurrentState, makeMove, getWinner] as const;
}
