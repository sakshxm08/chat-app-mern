const groupMessagesByDates = (messages) =>
  messages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

export default groupMessagesByDates;
