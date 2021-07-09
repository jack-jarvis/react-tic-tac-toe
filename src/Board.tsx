import { Square } from "./Square";
import { SquareState } from "./Types";

interface IBoardProps {
  squares: SquareState[];
  onClick: (i: number) => void;
}

export function Board(props: IBoardProps) {
  const renderSquare = (i: number) => {
    return (
      <Square
        squareNumber={i}
        value={props.squares[i]}
        onClick={() => {
          props.onClick(i);
        }}
      />
    );
  };

  return (
    <div data-testid="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
