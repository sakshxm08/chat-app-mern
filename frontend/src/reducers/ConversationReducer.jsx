export const ConversationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_CONTACTS":
      return { ...state, contacts: action.payload };
    case "SET_SELECTED_CONTACT":
      return {
        ...state,
        selectedContact: state.contacts.find(
          (contact) => contact._id === action.payload
        ),
      };
    case "SET_MESSAGES":
    case "SEND_AND_RECEIVE_MESSAGE": {
      const messages = action.payload.messages;
      const updatedMessagesByDates = messages.reduce(
        (acc, message) => {
          const date = new Date(message.createdAt).toLocaleDateString();
          acc[date] = [...(acc[date] || []), message];
          return acc;
        },
        { ...state.messagesByDates }
      );

      return {
        ...state,
        messages: [...state.messages, ...messages],
        messagesByDates: updatedMessagesByDates,
        selectedContact: {
          ...state.selectedContact,
          messages: [...state.selectedContact.messages, ...messages],
        },
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload.contact_id
            ? { ...contact, messages }
            : contact
        ),
      };
    }
    case "SET_MESSAGES_LOADING":
      return { ...state, messagesLoading: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
