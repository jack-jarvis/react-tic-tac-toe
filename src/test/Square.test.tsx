import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { Square } from "../Square";
import { SquareState } from "../Types";

const possibleSquareStates: SquareState[] = ["", "O", "X"];

describe("Square", () => {
  it.each(possibleSquareStates)("should display %p correctly", (symbol) => {
    act(() => {
      render(<Square value={symbol} onClick={() => {}} />);
    });
    expect(screen.getByRole("button")).toHaveTextContent(symbol);
  });

  it("should call onClick when clicked", () => {
    const onClick = jest.fn();
    act(() => {
      render(<Square value="" onClick={onClick} />);
      fireEvent.click(screen.getByRole("button"));
    });

    expect(onClick).toHaveBeenCalled();
  });
});
