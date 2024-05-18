import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
  ]);
  return (
    <div className="min-h-screen min-w-screen bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

const Layout = () => {
  return <Outlet />;
};

export default App;
