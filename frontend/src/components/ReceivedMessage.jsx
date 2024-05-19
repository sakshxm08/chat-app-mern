const ReceivedMessage = () => {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble bg-white dark:bg-dark text-black dark:text-gray-100">
        Hi
        <div className="flex items-end justify-end text-[10px] text-gray-400 w-full">
          <time>2:30 PM</time>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
