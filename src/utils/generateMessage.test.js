import { generateMessage } from "./generateMessage";

describe("generateMessage util", () => {
  let mockSetDailyMessage;
  let mockLocalStorage;

  beforeEach(() => {
    mockSetDailyMessage = jest.fn();
    mockLocalStorage = (() => {
      let store = {};
      return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
          store[key] = value;
        }),
        clear: () => {
          store = {};
        },
      };
    })();
  });

  it("uses saved message if date matches today", () => {
    const today = new Date().toDateString();
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === "dailyMessageDate") return today;
      if (key === "dailyMessage") return "You are enough!";
      return null;
    });

    generateMessage(["A", "B"], mockLocalStorage, mockSetDailyMessage, today);
    expect(mockSetDailyMessage).toHaveBeenCalledWith("You are enough!");
  });

  it("generates new message and saves it if no saved message or date mismatch", () => {
    const today = new Date().toDateString();
    mockLocalStorage.getItem.mockReturnValue(null);

    generateMessage(
      ["A", "B", "C"],
      mockLocalStorage,
      mockSetDailyMessage,
      today
    );

    expect(mockSetDailyMessage).toHaveBeenCalled();
    const calledWith = mockSetDailyMessage.mock.calls[0][0];
    expect(["A", "B", "C"]).toContain(calledWith);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "dailyMessage",
      calledWith
    );
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "dailyMessageDate",
      today
    );
  });
});
