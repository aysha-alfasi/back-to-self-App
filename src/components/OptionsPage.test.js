import { render, screen, fireEvent } from "@testing-library/react";
import OptionsPage from "./OptionsPage";

describe("OptionsPage Component", () => {
  it("renders the initial home screen with main navigation buttons", () => {
    render(<OptionsPage setPage={jest.fn()} />);

    expect(screen.getByText("Today’s Message")).toBeInTheDocument();
    expect(screen.getByText("Reflection Space")).toBeInTheDocument();
    expect(screen.getByText("View Reflections")).toBeInTheDocument();
    expect(screen.getByText("Back to cover")).toBeInTheDocument();

  });

  it("navigates to the message view on button click", () => {
    render(<OptionsPage setPage={jest.fn()} />);
    fireEvent.click(screen.getByText("Today’s Message"));
    expect(screen.getByText("← Back")).toBeInTheDocument();
  });

  it("returns from message view to home view when back is clicked", () => {
    render(<OptionsPage setPage={jest.fn()} />);
    fireEvent.click(screen.getByText("Today’s Message"));
    fireEvent.click(screen.getByText("← Back"));
    expect(screen.getByText("Reflection Space")).toBeInTheDocument();
  });

  it("calls setPage('cover') when 'Back to cover' is clicked", () => {
    const setPageMock = jest.fn();
    render(<OptionsPage setPage={setPageMock} />);
    fireEvent.click(screen.getByText("Back to cover"));
    expect(setPageMock).toHaveBeenCalledWith("cover");
  });
  
});
