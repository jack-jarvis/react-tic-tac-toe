import "@testing-library/jest-dom/extend-expect";
import { getWinnerFromBoardState, otherPlayer } from "../GameUtils";
import { BoardState } from "../Types";

describe("otherPlayer", () => {
  it("should return X if O is passed", () => {
    expect(otherPlayer("X")).toBe("O");
  });
  it("should return O if X is passed", () => {
    expect(otherPlayer("O")).toBe("X");
  });
});

describe("getWinnerFromBoardState", () => {
  it("should detect horizontal lines", () => {
    const boardState: BoardState = ["X", "X", "X", "", "", "", "", "", ""];

    const winner = getWinnerFromBoardState(boardState);

    expect(winner).toBe("X");
  });
  it("should detect vertical lines", () => {
    const boardState: BoardState = ["X", "", "", "X", "", "", "X", "", ""];

    const winner = getWinnerFromBoardState(boardState);

    expect(winner).toBe("X");
  });
  it("should detect diagonal lines", () => {
    const boardState: BoardState = ["X", "", "", "", "X", "", "", "", "X"];

    const winner = getWinnerFromBoardState(boardState);

    expect(winner).toBe("X");
  });
  it("should report no winner when board is empty", () => {
    const boardState: BoardState = ["", "", "", "", "", "", "", "", ""];

    const winner = getWinnerFromBoardState(boardState);

    expect(winner).toBe(null);
  });
  it("should report no winner when there is a line of different symbols", () => {
    const boardState: BoardState = ["X", "O", "X", "", "", "", "", "", ""];

    const winner = getWinnerFromBoardState(boardState);

    expect(winner).toBe(null);
  });
});
