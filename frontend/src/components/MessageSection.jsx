// Import necessary modules, hooks, and components
import { memo, useEffect, useRef, useState } from "react"; // React hooks
import useConversationContext from "../hooks/useConversationContext"; // Custom hook to access conversation context
import MessageInput from "./MessageInput"; // Component for message input field
import { useParams } from "react-router-dom"; // Hook to access URL parameters
import api from "../api/api"; // API module for making requests
import Message from "./Message"; // Component for displaying messages
import useListenMessages from "../hooks/useListenMessages"; // Custom hook for listening to new messages

// Memoized MessageSection component definition
const MessageSection = memo(() => {
  // Access conversation context using custom hook
  const Conversation = useConversationContext();

  // Listen for new messages
  useListenMessages();

  // State variable to store sorted message dates
  const [sortedDates, setSortedDates] = useState([]);

  // Get contact ID from URL parameters
  const { contact_id } = useParams();

  // Effect to set selected contact and fetch messages for the selected contact
  useEffect(() => {
    // Set selected contact in conversation context
    Conversation.dispatch({
      type: "SET_SELECTED_CONTACT",
      payload: contact_id,
    });

    // Function to fetch messages for the selected contact
    const getMessages = async () => {
      // Set messages loading state to true
      Conversation.dispatch({ type: "SET_MESSAGES_LOADING", payload: true });

      // Check if messages for the selected contact are already loaded
      if (
        !Conversation.contacts.find((contact) => contact._id === contact_id)
          ?.messages
      ) {
        // If messages not loaded, fetch messages from the backend
        const res = await api.get(`/messages/${contact_id}`);
        Conversation.dispatch({
          type: "SET_MESSAGES",
          payload: { messages: res.data, contact_id },
        });
      } else {
        // If messages already loaded, fetch messages from context
        Conversation.dispatch({
          type: "SET_MESSAGES",
          payload: {
            messages: Conversation.contacts.find(
              (contact) => contact._id === contact_id
            ).messages,
            contact_id,
          },
        });
      }

      // Set messages loading state to false
      Conversation.dispatch({ type: "SET_MESSAGES_LOADING", payload: false });
    };

    // Call the getMessages function
    getMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact_id]);

  // Effect to sort messages by date when messagesByDates or contact_id changes
  useEffect(() => {
    if (Conversation.messagesByDates) {
      // Sort message dates in ascending order
      setSortedDates(
        Object.keys(Conversation.messagesByDates).sort(
          (a, b) => new Date(a) - new Date(b)
        )
      );
    }
  }, [Conversation.messagesByDates, contact_id]);

  // Reference to message element for scrolling
  const messageEl = useRef(null);

  // Effect to scroll to bottom when new messages are loaded
  useEffect(() => {
    if (messageEl.current) {
      // Scroll to bottom of messages
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
  }, [Conversation.messages, contact_id, Conversation.messagesLoading]);

  // JSX rendering
  return Conversation.selectedContact ? (
    <div className="rounded-xl flex flex-col w-full gap-4 bg-base-100 dark:bg-dark h-[40rem] shadow p-4">
      {/* Selected contact information */}
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={Conversation.selectedContact.avatar}
              key={Conversation.selectedContact._id}
              alt="Contact Avatar"
            />
          </div>
        </div>
        <div className="flex flex-col w-full dark:text-gray-100">
          <h4 className="font-bold">
            {Conversation.selectedContact.f_name}{" "}
            {Conversation.selectedContact.l_name}
          </h4>
          <h6 className="text-xs font-light text-gray-600 dark:text-gray-400">
            @{Conversation.selectedContact.username}
          </h6>
        </div>
      </div>

      {/* Message loading or message display */}
      {Conversation.messagesLoading ? (
        // Display loading spinner while messages are loading
        <div className="h-full w-full items-center justify-center flex">
          <span className="loading loading-spinner dark:bg-white"></span>
        </div>
      ) : (
        // Display messages when loading is complete
        <div className="rounded-xl bg-base-200 dark:bg-gray-700 text-sm h-ful">
          {/* Message container */}
          <div
            ref={messageEl}
            className="h-[29.5rem] px-4 pt-4 flex flex-col overflow-y-scroll "
          >
            {/* Render messages by date */}
            {sortedDates?.map((date) => (
              <div key={date}>
                {/* Date header */}
                <div className="rounded-md mb-2 py-2 px-3 text-xs mx-auto w-fit bg-gray-500 text-white dark:bg-dark dark:text-gray-200">
                  {date}
                </div>
                {/* Messages for the date */}
                {Conversation.messagesByDates[date]?.map((message) => (
                  <div key={message._id}>
                    {/* Render individual message */}
                    <Message message={message} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Message input field */}
          <div className="p-4 w-full">
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  ) : (
    <></> // Render nothing if no selected contact
  );
});

// Set display name for MessageSection component
MessageSection.displayName = "MessageSection";

// Export MessageSection component
export default MessageSection;
