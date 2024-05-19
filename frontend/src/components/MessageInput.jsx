import { IoSend } from "react-icons/io5";
const MessageInput = () => {
  return (
    <form className="flex gap-2">
      <textarea
        className="w-full p-3 rounded-xl focus:outline-none resize-none"
        placeholder="Message"
        rows={1}
      ></textarea>
      <button className="flex items-center justify-center w-12 rounded-xl bg-lime-600 aspect-square text-white hover:bg-lime-700 transition-all cursor-pointer">
        <IoSend size={16} />
      </button>
    </form>
  );
};

export default MessageInput;
