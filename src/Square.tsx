import { SquareState } from "./Types";

export interface ISquareProps {
  value: SquareState;
  onClick: () => void;
  squareNumber: number;
}

export function Square(props: ISquareProps) {
  return (
    <button
      data-testid={`square-${props.squareNumber}`}
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
