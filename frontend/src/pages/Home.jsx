import { Outlet } from "react-router-dom";
// import MessageSection from "../components/MessageSection";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="w-1/3 lg:w-3/8 h-full">
        <Sidebar />
      </div>
      <div className="w-2/3 lg:w-5/8 h-full">
        {/* <MessageSection /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
