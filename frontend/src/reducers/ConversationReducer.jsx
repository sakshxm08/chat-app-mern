import groupMessagesByDates from "../utils/groupMessagesByDates";

export const ConversationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_CONTACTS": {
      return { ...state, contacts: action.payload };
    }
    case "SET_SELECTED_CONTACT": {
      const selectedContact = state.contacts.find(
        (contact) => contact._id === action.payload
      );
      return { ...state, selectedContact };
    }
    case "SEND_AND_RECEIVE_MESSAGE": {
      const { sender_id, receiver_id } = action.payload;
      const isMessageForSelectedContact =
        sender_id === state.selectedContact._id ||
        receiver_id === state.selectedContact._id;

      const updatedMessages = isMessageForSelectedContact
        ? [...state.messages, action.payload]
        : state.messages;

      const messagesByDates = groupMessagesByDates(updatedMessages);

      const updatedContacts = state.contacts.map((contact) => {
        if (contact._id === sender_id || contact._id === receiver_id) {
          return {
            ...contact,
            latest_message: action.payload,
          };
        }
        return contact;
      });

      const updatedSelectedContact = {
        ...state.selectedContact,
        messages: isMessageForSelectedContact
          ? updatedMessages
          : state.selectedContact.messages,
      };

      return {
        ...state,
        messages: updatedMessages,
        messagesByDates,
        selectedContact: updatedSelectedContact,
        contacts: updatedContacts,
      };
    }
    case "UPDATE_UNREAD_MESSAGES": {
      const updatedContacts = state.contacts.map((contact) => {
        if (contact._id === action.payload.sender_id) {
          const updatedUnreadMessages = contact.unread_messages
            ? [...contact.unread_messages, action.payload]
            : [action.payload];
          return { ...contact, unread_messages: updatedUnreadMessages };
        }
        return contact;
      });

      return { ...state, contacts: updatedContacts };
    }
    case "MARK_MESSAGE_AS_READ": {
      const { contact_id, message } = action.payload;
      const updatedMessages = state.messages.map((msg) =>
        msg.sender_id === contact_id && !msg.is_read && msg._id === message._id
          ? { ...msg, is_read: true }
          : msg
      );

      const messagesByDates = groupMessagesByDates(updatedMessages);

      const updatedContacts = state.contacts.map((contact) =>
        contact._id === contact_id
          ? {
              ...contact,
              messages: updatedMessages,
              unread_messages: [],
              latest_message: { ...contact.latest_message, is_read: true },
            }
          : contact
      );

      const updatedSelectedContact =
        contact_id === state.selectedContact._id
          ? {
              ...state.selectedContact,
              messages: updatedMessages,
            }
          : state.selectedContact;

      return {
        ...state,
        messages: updatedMessages,
        messagesByDates,
        contacts: updatedContacts,
        selectedContact: updatedSelectedContact,
      };
    }
    case "SET_MESSAGES": {
      const { messages, contact_id } = action.payload;

      const messagesByDates = groupMessagesByDates(messages);

      const updatedContacts = state.contacts.map((contact) =>
        contact._id === contact_id ? { ...contact, messages } : contact
      );

      const selectedContact = state.contacts.find(
        (contact) => contact._id === contact_id
      );
      const updatedSelectedContact = {
        ...selectedContact,
        messages,
      };

      return {
        ...state,
        messages,
        messagesByDates,
        contacts: updatedContacts,
        selectedContact: updatedSelectedContact,
      };
    }
    case "SET_MESSAGES_OF_CONTACT": {
      const { messages, contact_id } = action.payload;

      const updatedContacts = state.contacts.map((contact) =>
        contact._id === contact_id ? { ...contact, messages } : contact
      );

      return {
        ...state,
        contacts: updatedContacts,
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
