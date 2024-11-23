import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useAuthHook from "../api/auth";
import { useMutation } from "react-query";
//import useAuth from "../hooks/useAuth";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const { postLogout } = useAuthHook();

  const { mutateAsync } = useMutation(postLogout, {
    onSuccess: () => navigate("/auth/login"),
  });

  const logoutHandler = () => {
    mutateAsync({});
  };
  // const { auth } = useAuth();

  // const user = () => {
  //   const userInfo = auth?.userInfo;
  //   console.log(userInfo);

  //   return userInfo;
  // };

  return (
    <div className="flex flex-grow items-center justify-between px-4 py-2 shadow">
      <button
        className="p-1 w-8 h-8 block lg:hidden"
        type="button"
        aria-expanded={isSidebarOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={toggleSidebar}
      >
        <span className="material-symbols-rounded">menu</span>
      </button>
      <div className="hidden sm:block w-20">
        <form action="" method="POST">
          <div className="relative">
            <button className="absolute left-2 lg:left-0 top-1/2 w-6 h-6 -translate-y-1/2 text-slate-500">
              <span className="material-symbols-rounded">search</span>
            </button>
            <input
              type="text"
              placeholder="Search User, Company and more"
              className="w-full bg-gray-100 lg:bg-transparent pl-9 pr-4 py-2 text-slate-800 rounded-md focus:outline-none dark:text-white xl:w-125"
            />
          </div>
        </form>
      </div>
      <div className="relative">
        <Menu>
          <MenuButton className="flex items-center gap-4">
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-black dark:text-white">
                {/* {user && user.name ? user().name : "Guest"} */}
              </span>
              <Link
                to="/auth/login"
                className="flex items-center gap-1 px-3 py-2"
                aria-current="page"
                onClick={logoutHandler}
              >
                <span className="material-symbols-rounded">logout</span>
                <span>Logout</span>
              </Link>
              {/* <span className="block text-xs">Admin</span> */}
            </span>
            {/* <span className="h-10 w-10 rounded-full">
              <img src="/avatar.png" alt="User" />
            </span> */}
          </MenuButton>
          <MenuItems
            anchor="bottom end"
            className="w-60 z-[999] bg-white py-3 border rounded-lg shadow-md"
          >
            <MenuItem className="block data-[focus]:bg-blue-100">
              <Link
                to="/auth/login"
                className="flex items-center gap-3 px-3 py-2"
                aria-current="page"
                onClick={logoutHandler}
              >
                <span className="material-symbols-rounded">logout</span>
                <span>Logout</span>
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Header;