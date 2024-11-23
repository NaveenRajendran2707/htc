import { useEffect } from "react";
import { FormContainer, Message } from "../../components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { inputEmail } from "../../utils/dynamicForm";
import useAuthHook from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  useAuth();
  const { postForgotPassword } = useAuthHook();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, error, isSuccess, mutateAsync } =
    postForgotPassword;

  useEffect(() => {
    isSuccess && reset();
  }, [isSuccess]);

  useEffect(() => {
    auth?.userInfo && navigate("/");
  }, [navigate]);

  const submitHandler = (data) => {
    mutateAsync(data);
  };
  return (
    <>
      <Helmet>
        <title>Forgot</title>
        <meta property="og:title" content="Forgot" key="title" />
      </Helmet>
      <div className="bg-blue-50">
        <div className="grid grid-cols-12 lg:h-screen dark:bg-darkgray relative z-[999]">
          <div className="xl:col-span-7 lg:col-span-6 col-span-12 px-8 xl:px-20 justify-start pt-8 md:pt-[50px] lg:pt[100px] pb-8 flex flex-col relative overflow-hidden bg-gradient-to-b from-green-100 to-sky-100">
            <div className="mb-10">
              <img width="80" src="/htc.svg" className="img-fluid" alt="HTC" />
            </div>
            <h1 className="text-gray-900 font-medium text-lg lg:text-xl 2xl:text-3xl mb-2">
              Welcome to HTC Accounting
            </h1>
            <h2 className="text-sm lg:text-base 2xl:text-lg 2xl:font-medium">
              an simple and easy-to-use online accounting software
            </h2>
            <img
              className="max-w-100 hidden lg:block lg:w-auto"
              src="/accounting@2x.png"
              alt=""
            />
          </div>
          <div className="xl:col-span-5 lg:col-span-6 col-span-12 flex flex-col justify-center items-center pt-8 md:pt-10 lg:pt[100px] pb-8 lg:h-screen sm:px-12 px-4 relative z-10 bg-white xl:dark:bg-darkgray">
            <FormContainer>
              <h3 className="text-gray-900 font-medium text-lg lg:text-xl 2xl:text-3xl mb-2 text-center">
                Forgot Password?
              </h3>
              <p className="text-gray-900 text-sm lg:text-base 2xl:text-lg 2xl:font-medium mb-5 text-center">
                Enter your registered email id to reset password
              </p>
              {isSuccess && (
                <Message variant="success">
                  An email has been sent with further instructions.
                </Message>
              )}
              {isError && <Message variant="danger">{error}</Message>}

              <form onSubmit={handleSubmit(submitHandler)}>
                {inputEmail({
                  register,
                  errors,
                  label: "Email",
                  name: "email",
                  placeholder: "Email",
                })}

                <button
                  type="submit"
                  className="my-3 inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full"
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
                  <span className="px-3">Continue</span>
                </button>
              </form>
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

export default ForgotPassword;
