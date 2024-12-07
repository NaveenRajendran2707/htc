import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { inputText, inputSelect, inputDate } from "../../utils/dynamicForm";

const FormReceipts = () => {
  const [paymentType, setPaymentType] = useState("Cash");
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      receiptNo: "",
      receiptDate: "",
      receivedFrom: "",
      amountDue: "",
      paidAmount: "",
      balance: "",
      paymentType: "Cash",
      bankName: "",
      chequeNo: "",
      customerName: "",
      customerAddress: "",
      gstNo: "",
      narration: "",
    },
  });

  const submitHandler = (data) => {
    console.log("Form Data:", data);
    alert("Receipt Voucher Submitted Successfully");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {inputText({
        register,
        errors,
        label: "Receipt No",
        name: "receiptNo",
        placeholder: "Enter Receipt No",
      })}
      {inputDate({
        register,
        errors,
        label: "Receipt Date",
        name: "receiptDate",
        placeholder: "11/11/1999",
      })}
      {inputText({
        register,
        errors,
        label: "Received From",
        name: "receivedFrom",
        placeholder: "Enter Received From",
      })}
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
        placeholder: "Balance",
        isReadOnly: true,
      })}

      {inputSelect({
        register,
        errors,
        label: "Payment Type",
        name: "paymentType",
        options: [
          { label: "Cash", value: "Cash" },
          { label: "Cheque", value: "Cheque" },
        ],
        onChange: (e) => setPaymentType(e.target.value),
      })}

      {paymentType === "Cheque" && (
        <>
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
            label: "Cheque No.",
            name: "chequeNo",
            placeholder: "Enter Cheque No.",
          })}
        </>
      )}

      {inputText({
        register,
        errors,
        label: "Customer Name",
        name: "customerName",
        placeholder: "Enter Customer Name",
      })}
      {inputText({
        register,
        errors,
        label: "Customer Address",
        name: "customerAddress",
        placeholder: "Enter Customer Address",
      })}
      {inputText({
        register,
        errors,
        label: "GST No",
        name: "gstNo",
        placeholder: "Enter GST No",
      })}
      {inputText({
        register,
        errors,
        label: "Narration",
        name: "narration",
        placeholder: "Enter Narration",
        type: "textarea",
      })}

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
          className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-100  hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormReceipts;
