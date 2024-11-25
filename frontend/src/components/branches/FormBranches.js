import { useState } from "react";
import { Message } from "../../components";
import {
  inputHidden,
  inputCheckBox,
  inputSwitch,
  inputEmail,
  inputText,
  staticInputSelect,
  staticInputSelectState,
  inputDate,
} from "../../utils/dynamicForm";

// import { useState } from "react";

export const FormBranches = ({
  view,
  edit,
  formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  watch,
  isLoadingUpdate,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  error,
  setIsModalOpen,
  nextSequenceNumber,
  company,
  states,
  cities,
}) => {
  const getDynamicLabel = (field, value) => {
    if (field === "blocked") {
      return value ? "Inactive" : "Active";
    }
    return field;
  };
  const [city, setCity] = useState([]);
  const handleStateChange = (e) => {
    const id = e.target.selectedOptions[0].dataset.id;
    if (id !== "") {
      const filteredCities = cities
        .filter((item) => item?.state?._id === id)
        .map((item) => ({ name: item.cityName }));
      setCity(filteredCities);
    } else {
      setCity([]);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="w-full top-0 left-0 z-[999]">
          <div className="h-1 w-full bg-blue-100 overflow-hidden">
            <span className="sr-only">Loading...</span>
            <div className="animate-progress w-full h-full bg-blue-500 origin-left-right"></div>
          </div>
        </div>
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          {inputHidden({
            register,
            errors,
            label: "",
            name: "sequenceNumber",
            placeholder: "Sequence Number",
            value: nextSequenceNumber > 0 ? nextSequenceNumber : 1,
            readOnly: true,
          })}
          {inputText({
            register,
            errors,
            label: "Branch Code",
            name: "branchSerialNo",
            placeholder: "Branch Code",
            value:
              "BRN" +
              String(nextSequenceNumber > 0 ? nextSequenceNumber : 1).padStart(
                5,
                "0"
              ),
            readOnly: true,
          })}
          {inputDate({
            register,
            errors,
            label: "Registration Date",
            name: "registrationDate",
            placeholder: "11/11/2024",
            readOnly: view,
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Company ID",
            name: "companyID",
            placeholder: "Company ID",
            isRequired: true,
            data:
              company &&
              company.map((item) => ({
                name: item.companyID,
                _id: item._id,
              })),
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Branch ID",
            name: "branchID",
            placeholder: "TNCHN12345CO",
            readOnly: view,
          })}
          {/* {inputText({
            register,
            errors,
            label: "User ID",
            name: "user",
            placeholder: "User ID",
            readOnly: view,
          })} */}
          {inputText({
            register,
            errors,
            label: "Branch Name",
            name: "branchName",
            placeholder: "Branch Name",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Branch Short Name",
            name: "branchShortName",
            placeholder: "Branch Short Name",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "GSTIN Number",
            name: "gSTINNumber",
            placeholder: "GSTIN Number",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Address 1",
            name: "address1",
            placeholder: "House/Flat no, Building name",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Address 2",
            name: "address2",
            placeholder: "Street name/number",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Address 3",
            name: "address3",
            placeholder: "Block no. , Area Name",
            readOnly: view,
          })}
          {staticInputSelectState({
            register,
            errors,
            label: "State",
            name: "state",
            placeholder: "State",
            isRequired: false,
            data:
              states &&
              states.map((item) => ({
                name: item.stateName,
                _id: item._id,
              })),
            onChange: handleStateChange,
            readOnly: view,
          })}
          {staticInputSelect({
            register,
            errors,
            label: "City",
            name: "city",
            placeholder: "City",
            isRequired: false,
            data: city && city,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Pin code",
            name: "pincode",
            placeholder: "600 078",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Mobile Number",
            name: "mobileNumber",
            placeholder: "9876543210",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Phone Number",
            name: "phoneNumber",
            placeholder: "04412345678",
            readOnly: view,
          })}
          {inputEmail({
            register,
            errors,
            label: "Email ID",
            name: "email",
            placeholder: "Email",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Logo",
            name: "logo",
            placeholder: "Logo",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Watermark",
            name: "watermark",
            placeholder: "Watermark",
            readOnly: view,
          })}
          {inputSwitch({
            register,
            errors,
            watch,
            name: "blocked",
            label: getDynamicLabel("blocked", watch("blocked")),
            isRequired: false,
            placeholder: "Blocked",
            readOnly: view,
          })}
          {view ? (
            ""
          ) : (
            <div className="flex gap-3">
              <button
                type="submit"
                className="min-w-[120px] inline-flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-0 h-8text-center "
                disabled={isLoadingPost || isLoadingUpdate}
              >
                {isLoadingPost || isLoadingUpdate ? (
                  <span
                    className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full dark:text-white"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </span>
                ) : (
                  <span>{edit ? "Update" : "Save"}</span>
                )}
              </button>
              <button
                type="button"
                className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                onClick={() => {
                  setIsModalOpen(false);
                  formCleanHandler();
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default FormBranches;
