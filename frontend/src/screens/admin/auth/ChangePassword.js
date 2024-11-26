import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import FormChangePassword from "../../../components/change-password/FormChangePassword";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Helmet>
        <title>Change Password | HTC</title>
        <meta property="og:title" content="Sales Voucher" key="title" />
      </Helmet>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Change Password Form</h1>
        <FormChangePassword
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </>
  );
};

export default ChangePassword;
