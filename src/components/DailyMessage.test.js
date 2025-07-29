import { render, screen } from "@testing-library/react";
import DailyMessage from "./DailyMessage";

describe("DailyMessage Component", () => {
  it("calls generateMessage on mount", () => {
    const mockGenerate = jest.fn();
    render(<DailyMessage dailyMessage="" generateMessage={mockGenerate} />);
    expect(mockGenerate).toHaveBeenCalled();
  });

  it('shows loading message when dailyMessage is empty', () => {
    const mockGenerate = jest.fn();
    render(<DailyMessage dailyMessage="" generateMessage={mockGenerate} />);
    expect(screen.getByText("Generating your message!")).toBeInTheDocument();
  });

  it('displays the daily message when provided', () => {
    const mockGenerate = jest.fn();
    const message = "You are enough 🌸";
    render(<DailyMessage dailyMessage={message} generateMessage={mockGenerate} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
