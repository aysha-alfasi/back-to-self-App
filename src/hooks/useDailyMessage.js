import { useState, useEffect } from "react";

export function useDailyMessage(messages) {
  const [dailyMessage, setDailyMessage] = useState("");

  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("dailyMessageDate");
    const savedMessage = localStorage.getItem("dailyMessage");

    if (savedDate === today && savedMessage) {
      setDailyMessage(savedMessage);
    } else {
      const random = messages[Math.floor(Math.random() * messages.length)];
      setDailyMessage(random);
      localStorage.setItem("dailyMessage", random);
      localStorage.setItem("dailyMessageDate", today);
    }
  }, [messages]);

  return dailyMessage;
}
