import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { inputPassword } from "../../utils/dynamicForm";

const FormChangePassword = ({
  view,
  formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  watch,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  reset,
}) => {
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {inputPassword({
        register,
        errors,
        label: "New Password",
        name: "password",
        minLength: true,
        isRequired: false,
        placeholder: "Enter New Password",
        readOnly: view,
      })}
      {inputPassword({
        register,
        errors,
        watch,
        name: "confirmPassword",
        label: "Confirm Password",
        validate: true,
        minLength: true,
        isRequired: false,
        placeholder: "Enter Confirm Password",
        readOnly: view,
      })}
      <div className="flex gap-3 mt-4">
        {/* <button
          type="submit"
          className="min-w-[120px] inline-flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-0 h-8text-center "
        >
          Save
        </button> */}
        <button
          type="submit"
          className="min-w-[120px] text-white bg-blue-600 border-1 border-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-md text-sm px-3 py-1 text-center "
          disabled={isLoadingPost}
        >
          {isLoadingPost ? (
            <span
              className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </span>
          ) : (
            <span>{"Save"}</span>
          )}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormChangePassword;
