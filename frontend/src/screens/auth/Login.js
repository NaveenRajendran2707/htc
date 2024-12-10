import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FormContainer, Message } from "../../components";
import { useForm } from "react-hook-form";
import useAuthHook from "../../api/auth";
import useUserRolesHook from "../../api/userRoles";
import useMenusHook from "../../api/menus";
import {
  inputEmail,
  inputPassword,
  staticInputSelect,
} from "../../utils/dynamicForm";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const Login = () => {
  let [searchParams] = useSearchParams();
  const pathName = searchParams.get("next") || "/";
  const navigate = useNavigate();

  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuth } = useAuth();
  const { postLogin } = useAuthHook();
  const { postUserRoleById } = useUserRolesHook({
    page: 1,
    q: "",
    limit: 10000000,
  });

  const { getMenus } = useMenusHook({ limit: 1000000 });

  // console.log("postLogin", postLogin);

  const { isLoading, isError, error, mutateAsync, isSuccess, data } = postLogin;
  const {
    mutateAsync: userRoleMutateAsync,
    data: userRole,
    error: errorUserRole,
    isError: isErrorUserRole,
  } = postUserRoleById;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("userMenu", JSON.stringify(getMenus));
      userRoleMutateAsync(data._id);
      if (userRole) {
        localStorage.setItem("userRole", JSON.stringify(userRole));
        localStorage.setItem("userInfo", JSON.stringify(data));

        setAuth({
          userInfo: data,
          userRole: userRole,
        });
        navigate(pathName);
      }
    }
  }, [isSuccess, userRole]);

  useEffect(() => {
    auth?.userInfo && navigate("/");
  }, [navigate]);

  const submitHandler = async (data) => {
    mutateAsync(data);
  };

  return (
    <>
      <Helmet>
        <title>Login | HTC Accounting</title>
        <meta property="og:title" content="Login" key="title" />
      </Helmet>
      <div className="bg-blue-50">
        <div className="grid grid-cols-12 lg:h-screen dark:bg-darkgray relative z-[999]">
          <div className="xl:col-span-7 lg:col-span-6 col-span-12  justify-start pt-8 md:pt-10 lg:pt[100px] pb-8 px-8 xl:px-20 flex flex-col relative overflow-hidden bg-gradient-to-b from-green-100 to-sky-100">
            <div className="mb-10">
              <img width="80" src="/htc.svg" className="img-fluid" alt="HTC" />
            </div>
            <h1 className="text-gray-900 font-medium text-lg lg:text-xl 2xl:text-3xl mb-2">
              Welcome to HTC Accounting
            </h1>
            <h2 className="text-sm lg:text-base 2xl:text-lg 2xl:font-medium">
              a simple and easy-to-use online accounting software.
            </h2>
            <img
              className="max-w-100 hidden lg:block lg:w-auto"
              src="/accounting@2x.png"
              alt=""
            />
          </div>
          <div className="xl:col-span-5 lg:col-span-6 col-span-12 flex flex-col justify-center items-center pt-8 md:pt-10 lg:pt[100px] pb-8 sm:px-12 px-4 lg:h-screen relative z-10 bg-white xl:dark:bg-darkgray overflow-hidden overflow-y-auto">
            <FormContainer>
              <h3 className="text-gray-900 font-medium text-lg lg:text-xl 2xl:text-3xl mb-2 text-center">
                Sign in
              </h3>
              <p className="text-gray-900 text-sm lg:text-base 2xl:text-lg 2xl:font-medium mb-5 text-center">
                to start using HTC Accounting
              </p>
              {isError && <Message variant="danger">{error}</Message>}
              {isErrorUserRole && (
                <Message variant="danger">{errorUserRole}</Message>
              )}

              <form onSubmit={handleSubmit(submitHandler)}>
                {staticInputSelect({
                  register,
                  errors,
                  label: "User Type",
                  name: "usertype",
                  placeholder: "User Type",
                  isRequired: true,
                  data: [
                    { name: "Admin" },
                    { name: "Client" },
                    { name: "Channel Partner" },
                    // { name : "Employee"},
                    // { name : "Account"},
                  ],
                })}
                {inputEmail({
                  register,
                  errors,
                  label: "User Name",
                  name: "email",
                  placeholder: "Email or User Name",
                })}
                {inputPassword({
                  register,
                  errors,
                  label: "Password",
                  name: "password",
                  placeholder: "Password",
                })}
                <button
                  type="submit"
                  className="my-3 inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white text-base font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span
                      className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full dark:text-white"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="px-3">Sign In</span>
                </button>
              </form>
              <div className="mt-3">
                <Link to="/auth/forgot-password" className="text-blue-700">
                  Forgot Password?
                </Link>
              </div>
            </FormContainer>
            <p className="text-gray-400 text-sm mt-auto py-4">
              &copy; HTC 2024. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
