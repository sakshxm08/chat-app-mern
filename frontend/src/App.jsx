import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import useAuthContext from "./hooks/useAuthContext";

const App = () => {
  const Auth = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: Auth.user ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "signup",
          element: Auth.user ? <Navigate to="/" /> : <Signup />,
        },
        {
          path: "login",
          element: Auth.user ? <Navigate to="/" /> : <Login />,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen min-w-screen bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

const Layout = () => {
  return (
    <div className="p-6 flex flex-col items-center w-full gap-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
