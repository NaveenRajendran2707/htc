import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { inputText, inputSelect, inputDate } from "../../utils/dynamicForm";

const FormChangePassword = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const submitHandler = (data) => {
    console.log("Form Data:", data);
    alert("Sales Voucher Submitted Successfully");
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {inputText({
        register,
        errors,
        name: "password",
        label: "New Password",
        placeholder: "New Password",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "confirm",
        label: "Confirm New Password",
        placeholder: "Confirm New Password",
        isReadOnly: true,
      })}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="min-w-[120px] inline-flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-0 h-8text-center "
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormChangePassword;
