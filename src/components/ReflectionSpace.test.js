import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReflectionSpace from "./ReflectionSpace";

jest.mock("../components/ReflectionWritingArea", () => (props) => {

  return (
    <div>
      <button
        onClick={() => props.onSave("Test reflection text")}
      >
        Save Reflection
      </button>
      <button
        onClick={props.goBack}
      >
        Go Back
      </button>
    </div>
  );
});

describe("ReflectionSpace Component", () => {
  it("renders ReflectionWritingArea and calls saveReflection & goBack correctly", async () => {
    const saveReflectionMock = jest.fn();
    const goBackMock = jest.fn();

    render(<ReflectionSpace saveReflection={saveReflectionMock} goBack={goBackMock} />);

    const saveBtn = screen.getByText("Save Reflection");
    const goBackBtn = screen.getByText("Go Back");

     userEvent.click(saveBtn);
    expect(saveReflectionMock).toHaveBeenCalledWith("Test reflection text");

    userEvent.click(goBackBtn);
    expect(goBackMock).toHaveBeenCalled();
  });
});
