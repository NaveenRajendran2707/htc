import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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

  const { auth } = useAuth();
  const location = useLocation();
  const userMenuList = localStorage.getItem("userMenu")
    ? JSON.parse(localStorage.getItem("userMenu"))
    : null;
  const userMenus = auth?.userInfo?.menu || [];
  const menuItems =
    userMenuList?.data?.data?.filter((menuItem) =>
      userMenus.includes(menuItem._id)
    ) || [];
  console.log("MatchedMenu--->", menuItems);

  console.log("User Menus:", userMenus);
  console.log("Current Path:", location.pathname);

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
