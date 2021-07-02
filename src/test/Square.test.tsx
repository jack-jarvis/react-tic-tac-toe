import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Square } from "../Square";
import { SquareState } from "../Types";

let container : Element = document.createElement("div");

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

const possibleSquareStates: SquareState[] = ["", "O", "X"];

describe("square", () => {
    it.each(possibleSquareStates)("should display %p correctly", (symbol) => {
        act(() => {
            render(<Square value={symbol} onClick={()=>{}}/>, container);
        });
        expect(document.querySelector("button")?.textContent).toBe(symbol);
    });

    it("should call onClick when clicked", () => {
        const onClick = jest.fn();
        act(() => {
            render(<Square value="" onClick={onClick}/>, container);
            const button = document.querySelector("button");
            button?.dispatchEvent(new MouseEvent("click", {bubbles: true}))
        });

        expect(onClick).toHaveBeenCalled();
    });
});
