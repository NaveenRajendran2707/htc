import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  inputText,
  inputSelect,
  inputDate,
  inputPaymentSelect,
} from "../../utils/dynamicForm";

const FormReceipt = () => {
  const [paymentType, setPaymentType] = useState("Cash");
  console.log("paymentType", paymentType);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyAddress: "",
      date: "",
      receiptNo: "",
      receivedFrom: "",
      rupeeSumOf: "",
      paymentFor: "",
      fromName: "",
      toName: "",
      paymentType: "Cash",
      chequeNo: "",
      bankName: "",
      chequeDate: "",
      branchName: "",
      amountDue: "",
      paidAmount: "",
      balance: "",
      preparedBy: "",
      cashReceivedBy: "",
      authorizedSign: "",
    },
  });

  const submitHandler = (data) => {
    console.log("Form Data:", data);
    alert("Receipt Form Submitted Successfully");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {inputText({
        register,
        errors,
        label: "Company Full Address",
        name: "companyAddress",
        placeholder: "Enter Company Full Address",
        type: "textarea",
      })}
      {inputDate({
        register,
        errors,
        label: "Date",
        name: "date",
        placeholder: "Select Date",
      })}
      {inputText({
        register,
        errors,
        label: "Receipt No",
        name: "receiptNo",
        placeholder: "Enter Receipt No",
      })}
      {inputText({
        register,
        errors,
        label: "Received from M/s. / Mr.",
        name: "receivedFrom",
        placeholder: "Enter Name",
      })}
      {inputText({
        register,
        errors,
        label: "Rupee Sum of",
        name: "rupeeSumOf",
        placeholder: "Enter Amount in Words",
      })}
      {inputText({
        register,
        errors,
        label: "For Payment of",
        name: "paymentFor",
        placeholder: "Enter Reason for Payment",
      })}
      {inputText({
        register,
        errors,
        label: "From",
        name: "fromName",
        placeholder: "Enter Sender's Name",
      })}
      {inputText({
        register,
        errors,
        label: "To",
        name: "toName",
        placeholder: "Enter Receiver's Name",
      })}
      {inputPaymentSelect({
        register,
        errors,
        label: "Payment Made Type",
        name: "paymentType",
        options: [
          { label: "Cash", value: "Cash" },
          { label: "Cheque", value: "Cheque" },
        ],
        onChange: (e) => setPaymentType(e.target.value),
      })}
      {paymentType === "Cheque" && (
        <div>
          {inputText({
            register,
            errors,
            label: "Cheque No.",
            name: "chequeNo",
            placeholder: "Enter Cheque No.",
          })}
          {inputDate({
            register,
            errors,
            label: "Cheque Date",
            name: "chequeDate",
            placeholder: "Select Cheque Date",
          })}
          {inputText({
            register,
            errors,
            label: "Bank Name",
            name: "bankName",
            placeholder: "Enter Bank Name",
          })}
          {inputText({
            register,
            errors,
            label: "Branch Name",
            name: "branchName",
            placeholder: "Enter Branch Name",
          })}
        </div>
      )}
      {inputText({
        register,
        errors,
        label: "Amount Due",
        name: "amountDue",
        placeholder: "Enter Amount Due",
      })}
      {inputText({
        register,
        errors,
        label: "Paid Amount",
        name: "paidAmount",
        placeholder: "Enter Paid Amount",
      })}
      {inputText({
        register,
        errors,
        label: "Balance",
        name: "balance",
        placeholder: "Enter Balance",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        label: "Receipt Prepared by",
        name: "preparedBy",
        placeholder: "Enter Preparer's Name",
      })}
      {inputText({
        register,
        errors,
        label: "Cash Received by",
        name: "cashReceivedBy",
        placeholder: "Enter Receiver's Name",
      })}
      <div>
        <label htmlFor="authorizedSign">Authorized Sign</label>
        <input
          {...register("authorizedSign", { required: true })}
          type="file"
          id="authorizedSign"
          className="block mt-2"
        />
        {errors.authorizedSign && (
          <p className="text-red-600 text-sm">This field is required</p>
        )}
      </div>
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="min-w-[120px] inline-flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-0 h-8 text-center "
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormReceipt;
