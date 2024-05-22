export const ConversationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_CONTACTS": {
      return { ...state, contacts: action.payload }; // Update contacts with all contacts
    }
    case "SET_SELECTED_CONTACT": {
      return {
        ...state,
        selectedContact: state.contacts.find(
          (contact) => contact._id === action.payload
        ),
      }; // Set the selected contact based on the provided ID
    }
    case "SET_MESSAGES": {
      // Update messages, messagesByDates, selectedContact, and contacts with provided messages
      const messages = action.payload.messages;
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
      // Add the sent/received message to the messages, messagesByDates, selectedContact, and contacts
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
      return { ...state, messagesLoading: action.payload }; // Set loading state for messages
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload }; // Set loading state for the conversation
    }
    default: {
      return state; // Return current state for unrecognized actions
    }
  }
};
