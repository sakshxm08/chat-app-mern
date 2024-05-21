import { memo, useEffect, useRef, useState } from "react";
import useConversationContext from "../hooks/useConversationContext";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Message from "./Message";

const MessageSection = memo(() => {
  const Conversation = useConversationContext();

  const [sortedDates, setSortedDates] = useState([]);

  const { contact_id } = useParams();

  useEffect(() => {
    Conversation.dispatch({
      type: "SET_SELECTED_CONTACT",
      payload: contact_id,
    });
    const getMessages = async () => {
      Conversation.dispatch({ type: "SET_MESSAGES_LOADING", payload: true });
      if (
        !Conversation.contacts.find((contact) => contact._id === contact_id)
          ?.messages
      ) {
        const res = await api.get(`/messages/${contact_id}`);
        Conversation.dispatch({
          type: "SET_MESSAGES",
          payload: { messages: res.data, contact_id },
        });
      } else {
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
      Conversation.dispatch({ type: "SET_MESSAGES_LOADING", payload: false });
    };
    getMessages();
  }, [contact_id]);

  useEffect(() => {
    if (Conversation.messagesByDates) {
      setSortedDates(
        Object.keys(Conversation.messagesByDates).sort(
          (a, b) => new Date(a) - new Date(b)
        )
      );
    }
  }, [Conversation.messagesByDates, contact_id]);

  const messageEl = useRef(null);
  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
  }, [Conversation.messages, contact_id, Conversation.messagesLoading]);
  return Conversation.selectedContact ? (
    <div className="rounded-xl flex flex-col w-full gap-4 bg-base-100 dark:bg-dark h-[40rem] shadow p-4">
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={Conversation.selectedContact.avatar}
              key={Conversation.selectedContact._id}
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
      {Conversation.messagesLoading ? (
        <div className="h-full w-full items-center justify-center flex">
          <span className="loading loading-spinner dark:bg-white"></span>
        </div>
      ) : (
        <div className="rounded-xl bg-base-200 dark:bg-slate-700 text-sm h-ful">
          <div
            ref={messageEl}
            className="h-[29.5rem] px-4 pt-4 flex flex-col overflow-y-scroll "
          >
            {sortedDates?.map((date) => (
              <div key={date}>
                <div className="rounded-md py-2 px-3 text-xs mx-auto w-fit bg-gray-500 text-white dark:bg-dark dark:text-gray-200">
                  {date}
                </div>
                {Conversation.messagesByDates[date]?.map((message) => (
                  <div key={message._id}>
                    <Message message={message} />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="p-4 w-full">
            <MessageInput />
          </div>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
});

MessageSection.displayName = "MessageSection";
export default MessageSection;
