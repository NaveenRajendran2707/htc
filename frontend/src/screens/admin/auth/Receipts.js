import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import FormReceipts from "../../../components/receipts/FormReceipts";

const Receipts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Helmet>
        <title>Receipt | HTC</title>
        <meta property="og:title" content="Sales Voucher" key="title" />
      </Helmet>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Receipt Form</h1>
        <FormReceipts
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </>
  );
};

export default Receipts;
