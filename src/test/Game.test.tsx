import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Game } from "../Game";

interface IGameTestWrapper {
  getSquare: (squareNumber: number) => Promise<HTMLElement>;
  clickSquare: (squareNumber: number) => Promise<void>;
  clickHistoryEntry: (moveNumber: number) => Promise<void>;
  getStatusText: () => Promise<HTMLElement>;
}

const CreateGameTestWrapper = (): IGameTestWrapper => {
  const { findByTestId } = render(<Game />);

  const getSquare = async (squareNumber: number) => {
    return await findByTestId(`square-${squareNumber}`);
  };

  const clickSquare = async (squareNumber: number) => {
    const square = await getSquare(squareNumber);
    fireEvent.click(square);
  };

  const clickHistoryEntry = async (moveNumber: number) => {
    const button = await findByTestId(`history-${moveNumber}`);
    fireEvent.click(button);
  };
  return {
    getSquare: getSquare,
    clickSquare: clickSquare,
    getStatusText: async () => {
      return await findByTestId("status");
    },
    clickHistoryEntry: clickHistoryEntry,
  };
};

describe("Game", () => {
  it("should start with an empty board", async () => {
    const game = CreateGameTestWrapper();

    for (let i = 0; i < 9; i++) {
      const square = await game.getSquare(i);
      expect(square.innerHTML).toBe("");
    }
  });

  it("should add a symbol to a square when clicked", async () => {
    const game = CreateGameTestWrapper();
    await game.clickSquare(0);
    const clickedSquare = await game.getSquare(0);

    expect(clickedSquare.innerHTML).toBe("X");
  });

  it("should alternate between players", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0);
    expect((await game.getSquare(0)).innerHTML).toBe("X");
    expect((await game.getStatusText()).innerHTML).toBe("Next player: O");

    await game.clickSquare(1);
    expect((await game.getSquare(1)).innerHTML).toBe("O");
    expect((await game.getStatusText()).innerHTML).toBe("Next player: X");
  });

  it("should detect a win for X", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0); // X
    await game.clickSquare(3); // O
    await game.clickSquare(1); // X
    await game.clickSquare(4); // O
    await game.clickSquare(2); // X wins

    expect((await game.getStatusText()).innerHTML).toBe("The winner is X");
  });

  it("should detect a win for O", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(3); // X
    await game.clickSquare(0); // O
    await game.clickSquare(4); // X
    await game.clickSquare(1); // O
    await game.clickSquare(6); // X
    await game.clickSquare(2); // O wins

    expect((await game.getStatusText()).innerHTML).toBe("The winner is O");
  });

  it("should not allow additional moves after a win", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0); // X
    await game.clickSquare(3); // O
    await game.clickSquare(1); // X
    await game.clickSquare(4); // O
    await game.clickSquare(2); // X wins

    await game.clickSquare(5);

    expect((await game.getSquare(5)).innerHTML).toBe("");
  });

  it("should not change a cell value if it is clicked again", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0);
    expect((await game.getSquare(0)).innerHTML).toBe("X");

    await game.clickSquare(0);
    expect((await game.getSquare(0)).innerHTML).toBe("X");
  });
});

describe("History", () => {
  it("should reset board state when jumping", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0); // X
    await game.clickSquare(1); // O

    await game.clickHistoryEntry(1);

    expect((await game.getSquare(0)).innerHTML).toBe("X");
    expect((await game.getSquare(1)).innerHTML).toBe("");
  });
  it("should set correct player after jump", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0); // X
    await game.clickSquare(1); // O

    await game.clickHistoryEntry(1);

    expect((await game.getStatusText()).innerHTML).toBe("Next player: O");
  });
  it("should allow jumping to start of game", async () => {
    const game = CreateGameTestWrapper();

    await game.clickSquare(0); // X

    await game.clickHistoryEntry(0);

    expect((await game.getSquare(0)).innerHTML).toBe("");
  });
});
