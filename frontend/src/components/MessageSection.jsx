import MessageInput from "./MessageInput";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

const MessageSection = () => {
  return (
    <div className="rounded-xl flex flex-col w-full gap-4 bg-base-100 dark:bg-dark h-[40rem] shadow p-4">
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-col w-full dark:text-gray-100">
          <h4 className="font-bold">John Doe</h4>
        </div>
      </div>
      <div className="rounded-xl bg-base-200 dark:bg-slate-700 text-sm h-ful">
        <div className="max-h-[29.5rem] px-4 pt-4 flex flex-col-reverse overflow-y-scroll ">
          <ReceivedMessage />
          <SentMessage />
          <SentMessage />
          <SentMessage />
          <SentMessage />
          <SentMessage />
          <SentMessage />
          <SentMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <ReceivedMessage />
          <SentMessage />
        </div>
        <div className="p-4 w-full">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default MessageSection;
