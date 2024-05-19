import ContactPreview from "./ContactPreview";

const Sidebar = () => {
  return (
    <div className="rounded-xl flex flex-col w-full bg-base-100 dark:bg-dark h-[40rem] overflow-hidden shadow">
      <div className="flex w-full gap-2 items-center px-6 py-4 sticky top-0 bg-white dark:bg-dark/80 z-20 shadow">
        <h2 className="font-bold text-xl dark:text-white">Inbox</h2>
        <span className="px-2 py-1 rounded-md bg-red-600 font-medium text-white text-xs">
          3 New
        </span>
      </div>
      <div className="h-full overflow-scroll">
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
        <ContactPreview />
      </div>
    </div>
  );
};

export default Sidebar;
