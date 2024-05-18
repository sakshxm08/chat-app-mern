const MessageSection = () => {
  return (
    <div className="rounded-xl flex flex-col w-full gap-4 bg-base-100 dark:bg-dark h-[36rem] shadow p-4">
      <div className="flex gap-4 items-center">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-col w-ful">
          <h4 className="font-bold">John Doe</h4>
        </div>
      </div>
      <div className="rounded-xl bg-base-200 p-4 h-full"></div>
    </div>
  );
};

export default MessageSection;
