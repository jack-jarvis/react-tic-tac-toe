import React from "react";
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

interface IGameState {
  nextPlayer: PlayerSymbol;
  history: HistoryEntry[];
}

interface HistoryEntry {
  move: Move | null;
  squares: BoardState;
}

interface Move {
  square: number;
  player: PlayerSymbol;
}

const emptyBoard = Array(9).fill("");

export class Game extends React.Component<{}, IGameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      nextPlayer: "X",
      history: [
        {
          move: null,
          squares: emptyBoard,
        },
      ],
    };
  }

  getCurrentState(): BoardState {
    return this.state.history[this.state.history.length - 1].squares;
  }

  handleClick(i: number): void {
    if (getWinner(this.getCurrentState())) return;

    const squares = this.getCurrentState().slice();
    if (squares[i] === "") {
      squares[i] = this.state.nextPlayer;
      const history = this.state.history.slice();
      history.push({
        move: {
          square: i,
          player: this.state.nextPlayer,
        },
        squares: squares,
      });
      this.setState({
        nextPlayer: otherPlayer(this.state.nextPlayer),
        history: history,
      });
    }
  }

  render() {
    const winner = getWinner(this.getCurrentState());
    const status = winner
      ? `The winner is ${winner}`
      : `Next player: ${this.state.nextPlayer}`;

    const historyList = this.state.history.map((h) => {
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
            squares={this.getCurrentState()}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{historyList}</ol>
        </div>
      </div>
    );
  }
}
