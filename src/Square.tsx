import { SquareState } from "./Types"

export interface ISquareProps {
    value: SquareState;
    onClick: () => void;
  }
  

export function Square(props: ISquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
