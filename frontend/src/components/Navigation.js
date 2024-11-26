import { Link, useNavigate } from "react-router-dom";
import useAuthHook from "../api/auth";
import { useMutation } from "react-query";
import useAuth from "../hooks/useAuth";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { clsx } from "clsx";
import useMenusHook from "../api/menus";
const Navigation = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { postLogout } = useAuthHook();
  const { auth } = useAuth();
  const { mutateAsync } = useMutation(postLogout, {
    onSuccess: () => navigate("/auth/login"),
  });

  const logoutHandler = () => {
    mutateAsync({});
  };

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const guestItems = () => {
    return (
      <nav className="">
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <Link
              to="/auth/login"
              className="block font-medium py-1 px-3 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease"
              aria-current="page"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  const user = () => {
    const userInfo = auth?.userInfo;
    return userInfo;
  };

  const { getMenus } = useMenusHook({ limit: 1000000 });
  // console.log("getMenus", getMenus);

  // const menus = () => {
  //   console.log("userInfo--", auth?.userRole);
  //   const dropdownItems = auth?.userRole?.menu?.map((route) => route?.menu);

  //   const menuItems = auth?.userRole?.menu?.map((route) => route);
  //   console.log("menuItems", menuItems);

  //   const dropdownArray =
  //     dropdownItems &&
  //     dropdownItems.filter((item) => item !== "hidden" && item !== "normal");

  //   const uniqueDropdowns = [...new Set(dropdownArray)];
  //   console.log("uniqueDropdowns", uniqueDropdowns);

  //   return { uniqueDropdowns, menuItems };
  // };

  const menus = () => {
    const userMenuIds = auth?.userInfo?.menu || [];
    const menuItems =
      (getMenus &&
        getMenus?.data?.data?.filter((menuItem) =>
          userMenuIds.includes(menuItem._id)
        )) ||
      [];
    // console.log("MatchedMenu", menuItems);
    const uniqueDropdowns = [...new Set(menuItems.map((menu) => menu.menu))];
    // console.log("UniqueDropdowns", uniqueDropdowns);
    console.log("uniqueDropdowns", uniqueDropdowns, menuItems);
    return { uniqueDropdowns, menuItems };
  };

  const handleLinkClick = (event) => {
    console.log("Linkclicked", event);
  };

  const authItems = () => {
    return (
      // <>
      //   {menus() &&
      //     menus().menuItems.map(
      //       (menu) =>
      //         menu.menu === "normal" &&
      //         menu.auth === true && (
      //           <li key={menu._id}>
      //             <Link
      //               to={menu.path}
      //               className="group relative flex items-center gap-2 rounded px-4 py-2 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 dark:bg-slate-600 bg-slate-600 text-slate-50 active"
      //               aria-current="page"
      //             >
      //               <span className="material-symbols-rounded">dashboard</span>
      //               <span>{menu.name}</span>
      //             </Link>
      //           </li>
      //         )
      //     )}

      //   {menus() &&
      //     menus().uniqueDropdowns.map((item) => (
      //       <Disclosure as="li" key={item}>
      //         {({ open }) => (
      //           <>
      //             <DisclosureButton className="group relative flex justify-between items-center gap-2 w-full rounded p-2 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 data-[open]:bg-slate-700">
      //               <span className="material-symbols-rounded">
      //                 shield_person
      //               </span>
      //               <span>
      //                 {item === "profile"
      //                   ? user() && user().firstName + " " + user().lastName
      //                   : item.charAt(0).toUpperCase() + item.substring(1)}
      //               </span>
      //               <span
      //                 className={clsx(
      //                   "material-symbols-rounded ml-auto",
      //                   open && "rotate-180"
      //                 )}
      //               >
      //                 keyboard_arrow_down
      //               </span>
      //             </DisclosureButton>
      //             <DisclosurePanel>
      //               <ul className="pb-4 pt-2 flex flex-col pl-4 space-y-2">
      //                 {menus() &&
      //                   menus().menuItems.map(
      //                     (menu) =>
      //                       menu.menu === item && (
      //                         <li key={menu._id}>
      //                           <Link
      //                             to={menu.path}
      //                             className="group relative flex items-center gap-2 rounded-md pl-6 py-1 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
      //                           >
      //                             {menu.name}
      //                           </Link>
      //                         </li>
      //                       )
      //                   )}
      //                 {item === "profile" && (
      //                   <>
      //                     <li>
      //                       <button
      //                         onClick={logoutHandler}
      //                         className="group relative flex items-center gap-2 rounded-md pl-6 py-1 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
      //                       >
      //                         <span>Logout</span>
      //                       </button>
      //                     </li>
      //                   </>
      //                 )}
      //               </ul>
      //             </DisclosurePanel>
      //           </>
      //         )}
      //       </Disclosure>
      //     ))}
      // </>
      <>
        {menus() &&
          menus().menuItems?.map(
            (menu) =>
              menu.menu === "normal" &&
              menu.auth === true && (
                <li key={menu._id}>
                  <Link
                    to={menu.path}
                    className="group relative flex items-center gap-2 rounded px-4 py-2 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 bg-slate-600 text-slate-50 active"
                    aria-current="page"
                  >
                    <span className="material-symbols-rounded">dashboard</span>
                    <span>{menu.name}</span>
                  </Link>
                </li>
              )
          )}

        {menus() &&
          menus()
            .uniqueDropdowns?.sort((a, b) => {
              const dropdownOrder = [
                "home",
                "users",
                "master",
                "customer",
                "product",
                "transaction",
                "profile",
                "configurations",
              ];
              return dropdownOrder.indexOf(a) - dropdownOrder.indexOf(b);
            })
            .map((item) => (
              <Disclosure as="li" key={item}>
                {({ open }) => (
                  <>
                    <DisclosureButton className="group relative flex justify-between items-center gap-2 w-full rounded p-2 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 data-[open]:bg-slate-700">
                      <span className="material-symbols-rounded">
                        shield_person
                      </span>
                      <span>
                        {item === "profile"
                          ? user()?.firstName + " " + user()?.lastName
                          : item.charAt(0).toUpperCase() + item.substring(1)}
                      </span>
                      <span
                        className={clsx(
                          "material-symbols-rounded ml-auto",
                          open && "rotate-180"
                        )}
                      >
                        keyboard_arrow_down
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <ul className="pb-4 pt-2 flex flex-col pl-4 space-y-2">
                        {menus() &&
                          menus()
                            .menuItems?.sort((a, b) => a.order - b.order)
                            .map(
                              (menu) =>
                                menu.menu === item && (
                                  <li key={menu._id}>
                                    <Link
                                      to={menu.path}
                                      onClick={() => handleLinkClick(menu.path)}
                                      className="group relative flex items-center gap-2 rounded-md pl-6 py-1 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                                    >
                                      {menu.name}
                                    </Link>
                                  </li>
                                )
                            )}
                        {item === "profile" && (
                          <>
                            <li>
                              <button
                                onClick={logoutHandler}
                                className="group relative flex items-center gap-2 rounded-md pl-6 py-1 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                              >
                                <span>Logout</span>
                              </button>
                            </li>
                          </>
                        )}
                      </ul>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            ))}
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between p-3">
        <img src="/htc-white.svg" width="80" className="max-w-full" alt="HTC" />
        <button
          type="button"
          className="inline-flex lg:hidden text-gray-400 rounded-full hover:text-gray-200 focus-visible:ring-4 transition duration-150 ease-linear p-2"
          aria-label="Close"
          onClick={toggleSidebar}
        >
          <span className="material-symbols-rounded">close</span>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-200 ease-linear">
        <nav className="mt-3 py-4 px-2">
          <ul className="mb-6 flex flex-col gap-2">
            {userInfo ? authItems() : guestItems()}

            {/* <Disclosure as="li">
                <DisclosureButton className="group relative flex justify-between items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600">
                  <span className="material-symbols-rounded">
                    shield_person
                  </span>
                  <span>Administration</span>
                  <span className="material-symbols-rounded ml-auto">
                    keyboard_arrow_down
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                  <ul className="mb-3 flex flex-col pl-4 space-y-3">
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        State & City
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Department & Designation
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Unit & Unit Conversion
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Service Type
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Company Branch
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Channel Partner
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Rights
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Reset Password
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Configuration
                      </a>
                    </li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
              <li>
                <a
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600"
                  href="/profile"
                >
                  <span className="material-symbols-rounded">business</span>
                  <span>Company</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">
                    manage_accounts
                  </span>
                  <span>Account</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">inventory_2</span>
                  <span>Product</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">contract</span>
                  <span>Transaction</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">analytics</span>
                  <span>Reports</span>
                </a>
              </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
