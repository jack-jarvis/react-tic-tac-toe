import { Board } from "./Board";
import useGameState from "./useGameState";

export function Game() {
  const [nextPlayer, history, getCurrentState, makeMove, getWinner] =
    useGameState();

  const handleClick = (i: number): void => {
    makeMove(i);
  };

  const winner = getWinner();
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
