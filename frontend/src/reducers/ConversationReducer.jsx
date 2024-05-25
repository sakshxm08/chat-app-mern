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
        sender_id === state.selectedContact?._id ||
        receiver_id === state.selectedContact?._id;

      const updatedMessagesOfSelectedContact = isMessageForSelectedContact
        ? [...state.selectedContact.messages, action.payload]
        : state.selectedContact?.messages;

      console.log(updatedMessagesOfSelectedContact);
      const messagesByDates = groupMessagesByDates(
        updatedMessagesOfSelectedContact || []
      );
      console.log(messagesByDates);

      const updatedContacts = state.contacts.map((contact) => {
        if (contact._id === sender_id || contact._id === receiver_id) {
          return {
            ...contact,
            messages: contact.messages
              ? [...contact.messages, action.payload]
              : [action.payload],
            latest_message: action.payload,
          };
        }
        return contact;
      });

      const updatedSelectedContact = {
        ...state.selectedContact,
        messages: updatedMessagesOfSelectedContact,
      };

      return {
        ...state,
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
      const updatedMessages = state.contacts
        .find((contact) => contact._id === contact_id)
        ?.messages.map((msg) =>
          msg.sender_id === contact_id &&
          !msg.is_read &&
          msg._id === message._id
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

      const updatedSelectedContact = {
        ...state.selectedContact,
        messages,
      };

      return {
        ...state,
        messagesByDates,
        contacts: updatedContacts,
        selectedContact: updatedSelectedContact,
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
