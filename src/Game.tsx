import { useState } from "react";
import { Board } from "./Board";
import { PlayerSymbol, SquareState, BoardState } from "./Types";

const otherPlayer = (symbol: PlayerSymbol): PlayerSymbol => {
  return symbol === "X" ? "O" : "X";
};

const getWinner = (squares: SquareState[]): PlayerSymbol | null => {
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

interface HistoryEntry {
  move: Move | null;
  squares: BoardState;
}

interface Move {
  square: number;
  player: PlayerSymbol;
}

const emptyBoard = Array(9).fill("");

export function Game() {
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

  const handleClick = (i: number): void => {
    if (getWinner(getCurrentState())) return;

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

  const winner = getWinner(getCurrentState());
  const status = winner
    ? `The winner is ${winner}`
    : `Next player: ${nextPlayer}`;

  const historyList = history.map((h) => {
    if (h.move) {
      return (
        <li>
          {h.move.player} in {h.move.square} <button>Jump to</button>
        </li>
      );
    }
    return (
      <li>
        Start <button>Jump to</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={getCurrentState()}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{historyList}</ol>
      </div>
    </div>
  );
}
