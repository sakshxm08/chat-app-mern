import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
import ThemeController from "./ThemeController";

const Navbar = () => {
  const Auth = useAuthContext();

  const { logout } = useLogout();
  return (
    <div className="navbar bg-base-100 px-4 rounded-xl shadow dark:text-gray-100 dark:bg-dark">
      <div className="flex-1">
        <a className="text-xl font-semibold">Buzz</a>
      </div>
      <div className="flex-none gap-4">
        <ThemeController />
        {Auth.user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={Auth.user.f_name || "User"} src={Auth.user.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 dark:bg-dark rounded-box w-52"
            >
              <li className="dark:hover:bg-slate-900 transition-all rounded-lg">
                <a className="justify-between">Profile</a>
              </li>
              <li className="dark:hover:bg-slate-900 transition-all rounded-lg">
                <a>Settings</a>
              </li>
              <li
                className="dark:hover:bg-slate-900 transition-all rounded-lg"
                onClick={logout}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
