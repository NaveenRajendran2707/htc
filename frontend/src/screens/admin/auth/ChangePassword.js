import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import FormChangePassword from "../../../components/change-password/FormChangePassword";
import useChangePasswordsHook from "../../../api/changePassword";
import useAuthHook from "../../../api/auth";
import useUsersHook from "../../../api/users";
import { Message } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmed: true,
      blocked: false,
    },
  });
  const navigate = useNavigate();
  const { postLogout } = useAuthHook();
  const { postChangePassword } = useChangePasswordsHook({});

  const { getUsers } = useUsersHook({
    limit: 1000000,
  });

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  // console.log("userInfo", getUsers, userInfo);

  const filteredUsers = getUsers?.data?.data?.filter(
    (user) => user._id === userInfo?._id
  );
  // console.log("Filtered Users", filteredUsers[0]?.userID);

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postChangePassword;

  const { mutateAsync } = useMutation(postLogout, {
    onSuccess: () => navigate("/auth/login"),
  });

  const logoutHandler = () => {
    mutateAsync({});
  };

  const submitHandler = async (data) => {
    console.log("Form Data:", data);
    // reset();
    const result = await mutateAsyncPost({
      password: data.password,
      email: userInfo.email,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      userID: filteredUsers && filteredUsers[0]?.userID,
    });
    console.log("data", result);
    if (result) logoutHandler();
  };

  return (
    <>
      <Helmet>
        <title>Change Password | HTC</title>
        <meta property="og:title" content="Sales Voucher" key="title" />
      </Helmet>
      {isSuccessPost && (
        <Message variant="success">
          Change Password has been created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Change Password Form</h1>
        <FormChangePassword
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isLoadingPost={isLoadingPost}
          submitHandler={submitHandler}
          watch={watch}
          reset={() => reset()}
        />
      </div>
    </>
  );
};

export default ChangePassword;
