export const ConversationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_CONTACTS": {
      return { ...state, contacts: action.payload };
    }
    case "SET_SELECTED_CONTACT": {
      return {
        ...state,
        selectedContact: state.contacts.find(
          (contact) => contact._id === action.payload
        ),
      };
    }
    case "SET_MESSAGES": {
      const messages = action.payload.messages;
      const messagesByDates = messages.reduce((acc, message) => {
        const date = new Date(message.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      }, {});
      console.log(messages);
      console.log(messagesByDates);
      return {
        ...state,
        messages,
        messagesByDates,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload.contact_id
            ? { ...contact, messages }
            : contact
        ),
        selectedContact: {
          ...state.contacts.find(
            (contact) => contact._id === action.payload.contact_id
          ),
          messages,
        },
      };
    }
    case "SEND_AND_RECEIVE_MESSAGE": {
      const messages = [...state.messages, action.payload];
      const messagesByDates = messages.reduce((acc, message) => {
        const date = new Date(message.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      }, {});
      return {
        ...state,
        messages,
        messagesByDates,
        selectedContact: { ...state.selectedContact, messages },
        contacts: state.contacts.map((contact) =>
          contact._id === state.selectedContact._id
            ? { ...contact, messages }
            : contact
        ),
      };
    }
    case "SET_MESSAGES_LOADING": {
      return { ...state, messagesLoading: action.payload };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }
    default: {
      return state;
    }
  }
};
