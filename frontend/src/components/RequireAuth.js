import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useMenusHook from "../api/menus";

const RequireAuth = () => {
  // const { auth } = useAuth()
  // const location = useLocation()

  // return auth?.userRole?.menu
  //   ?.map((path) => path?.path)
  //   ?.includes(location.pathname) ? (
  //   <Outlet />
  // ) : auth?.userInfo ? (
  //   <Navigate to='/' state={{ from: location }} replace />
  // ) : (
  //   <Navigate
  //     to={`/auth/login?next=${location.pathname}`}
  //     state={{ from: location }}
  //     replace
  //   />
  // )
  const { getMenus } = useMenusHook({ limit: 1000000 });
  const { auth } = useAuth();
  const location = useLocation();
  const userMenus = auth?.userInfo?.menu || [];
  const menuItems =
    (getMenus &&
      getMenus?.data?.data?.filter((menuItem) =>
        userMenus.includes(menuItem._id)
      )) ||
    [];
  // console.log("MatchedMenu--->", menuItems);

  // console.log("User Menus:", userMenus);
  // console.log("Current Path:", location.pathname);

  return menuItems?.map((path) => path?.path)?.includes(location.pathname) ? (
    <Outlet />
  ) : auth?.userInfo ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate
      to={`/auth/login?next=${location.pathname}`}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
