import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import FormSalesVoucher from "../../../components/sales-purchase/FormSalesVoucher";

const SalesVoucher = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Helmet>
        <title>Sales / Purchase Voucher | HTC</title>
        <meta property="og:title" content="Sales Voucher" key="title" />
      </Helmet>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Sales / Purchase Voucher Form</h1>
        <FormSalesVoucher
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        />
      </div>
    </>
  );
};

export default SalesVoucher;
