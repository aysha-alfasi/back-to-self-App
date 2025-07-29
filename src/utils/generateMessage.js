export function generateMessage(
  messages,
  localStorage,
  setDailyMessage,
  todayDateStr
) {
  const today = todayDateStr || new Date().toDateString();
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
}
