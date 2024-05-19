const SentMessage = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-lime-600 dark:bg-lime-700 text-white">
        You underestimate my power!
        <div className="flex items-end justify-end text-[10px] text-gray-200 w-full">
          <time>2:30 PM</time>
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
