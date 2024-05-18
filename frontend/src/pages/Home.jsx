import MessageSection from "../components/MessageSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="p-12 flex flex-col items-center w-full gap-10">
      <Navbar />
      <div className="flex w-full gap-10">
        <div className="w-1/4 h-full">
          <Sidebar />
        </div>
        <div className="w-3/4 h-full">
          <MessageSection />
        </div>
      </div>
      {/* <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-800"></div> */}
    </div>
  );
};

export default Home;
