import { render, screen, fireEvent } from "@testing-library/react";
import ReflectionWritingArea from "./ReflectionWritingArea";

describe("ReflectionWritingArea", () => {

    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
      });
      
      afterEach(() => {
        const modalRoot = document.getElementById('modal-root');
        if (modalRoot) {
          document.body.removeChild(modalRoot);
        }
      });

    
  it("saves text, shows modal, and calls onSave & goBack handlers", () => {
    const onSaveMock = jest.fn();
    const goBackMock = jest.fn();

    render(<ReflectionWritingArea onSave={onSaveMock} goBack={goBackMock} />);

    const editableDiv = screen.getByTestId("writing-area");

    fireEvent.input(editableDiv, {
      target: { innerText: "My test reflection" }
    });

    fireEvent.click(screen.getByText("Save"));

    expect(onSaveMock).toHaveBeenCalledWith("My test reflection");

    expect(screen.getByText("Your Reflection is added 🌸")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Ok"));
    expect(screen.queryByText("Your Reflection is added 🌸")).not.toBeInTheDocument();

    fireEvent.input(editableDiv, {
      target: { innerText: "Another reflection" }
    });
    fireEvent.click(screen.getByText("Save"));

    fireEvent.click(screen.getByText("Go home"));
    expect(goBackMock).toHaveBeenCalled();
  });

  it("does not call onSave or show modal when input is empty", () => {
    const onSaveMock = jest.fn();
    const goBackMock = jest.fn();

    render(<ReflectionWritingArea onSave={onSaveMock} goBack={goBackMock} />);

    const editableDiv = screen.getByTestId("writing-area");

    fireEvent.input(editableDiv, {
      target: { innerText: "    " }
    });

    fireEvent.click(screen.getByText("Save"));

    expect(onSaveMock).not.toHaveBeenCalled();
    expect(screen.queryByText("Your Reflection is added 🌸")).not.toBeInTheDocument();
  });
});
