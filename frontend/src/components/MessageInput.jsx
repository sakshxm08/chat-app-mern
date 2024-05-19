import { IoSend } from "react-icons/io5";
const MessageInput = () => {
  return (
    <form className="flex gap-2">
      <textarea
        className="w-full p-3 rounded-xl focus:outline-none resize-none dark:bg-dark dark:text-gray-100"
        placeholder="Message"
        rows={1}
      ></textarea>
      <button className="flex items-center justify-center w-12 rounded-xl bg-lime-600 dark:bg-lime-700 aspect-square text-white hover:bg-lime-700 dark:hover:bg-lime-800 transition-all cursor-pointer">
        <IoSend size={16} />
      </button>
    </form>
  );
};

export default MessageInput;
