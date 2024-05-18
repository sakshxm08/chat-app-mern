const ContactPreview = () => {
  return (
    <div className="px-6 py-3 hover:bg-base-200 transition-all flex gap-4 items-center cursor-pointer">
      <div className="avatar online">
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col w-ful">
        <div className="flex justify-between items-center">
          <h4 className="font-bold">John Doe</h4>
          <span className="text-xs ">2:30</span>
        </div>
        <p className="truncate overflow-hidden text-sm text-gray-400 max-w-56">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
          minus earum modi magni natus pariatur, quidem et quaerat alias
          blanditiis.
        </p>
      </div>
    </div>
  );
};

export default ContactPreview;
