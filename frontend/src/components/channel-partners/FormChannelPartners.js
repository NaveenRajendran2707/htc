import { useEffect, useState } from "react";
import { Message } from "..";
import {
  inputHidden,
  inputCheckBox,
  inputSwitch,
  inputEmail,
  inputPassword,
  staticInputSelectState,
  inputText,
  staticInputSelect,
  inputDate,
  dynamicInputSelect,
  inputMultipleCheckBoxGroups,
  inputMultipleCheckBox,
} from "../../utils/dynamicForm";

const methodConversion = (methodName) => {
  switch (methodName) {
    case "GET":
      return "List";
    case "POST":
      return "Add";
    case "PUT":
      return "Edit";
    case "DELETE":
      return "Delete";
  }
};

export const FormChannelPartners = ({
  edit,
  view,
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
  permissionData,
  menuData,
  nextSequenceNumber,
  states,
  cities,
  user,
}) => {
  const getDynamicLabel = (field, value) => {
    if (field === "blocked") {
      return value ? "Inactive" : "Active";
    }
    return field;
  };
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  useEffect(() => {
    const currentPermissions = watch("permission") || [];
    setCheckedPermissions(currentPermissions);
  }, [watch("permission")]);
  const [city, setCity] = useState([]);
  const [getTrue, setTrue] = useState(false);
  const handleStateChange = (e) => {
    setTrue(true);
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
          {inputHidden({
            register,
            errors,
            label: "",
            name: "userID",
            placeholder: "User ID",
            value:
              "USR" +
              String(nextSequenceNumber > 0 ? nextSequenceNumber : 1).padStart(
                5,
                "0"
              ),
            readOnly: true,
          })}
          {inputText({
            register,
            errors,
            label: "Channel Partner Code",
            name: "channelPartnerSerialNo",
            placeholder: "Channel Partner Code",
            value:
              "CPT" +
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
            placeholder: "11/11/1999",
            isRequired: true,
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
            data: edit && !getTrue ? [{ name: watch("city") }] : city && city,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Introduction ID",
            name: "introductionID",
            placeholder: "TNCHN12345CO",
            isRequired: true,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Channel Partner ID",
            name: "channelPartnerID",
            placeholder: "TNCHN12345CP",
            isRequired: true,
            readOnly: view,
          })}
          {dynamicInputSelect({
            register,
            errors,
            label: "User ID",
            name: "userName",
            placeholder: "User ID",
            isRequired: true,
            data: user && user,
            value: "firstName",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "First Name",
            name: "firstName",
            placeholder: "First Name",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Last Name",
            name: "lastName",
            placeholder: "Last Name",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Address 1",
            name: "address1",
            placeholder: "House/Flat no, Building name",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Address 2",
            name: "address2",
            placeholder: "Street name/number",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Address 3",
            name: "address3",
            placeholder: "Block no. , Area Name",
            isRequired: false,
            readOnly: view,
          })}

          {inputText({
            register,
            errors,
            label: "Pin code",
            name: "pincode",
            placeholder: "600 078",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Mobile Number",
            name: "mobileNumber",
            placeholder: "044 12345678",
            isRequired: true,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Phone Number",
            name: "phoneNumber",
            placeholder: "044 12345678",
            isRequired: false,
            readOnly: view,
          })}
          {inputEmail({
            register,
            errors,
            label: "Email ID",
            name: "email",
            placeholder: "hramkumar@gmail.com",
            isRequired: true,
            readOnly: view,
          })}
          {view || edit ? (
            <div></div>
          ) : (
            <div>
              {inputPassword({
                register,
                errors,
                label: "Password",
                name: "password",
                minLength: true,
                isRequired: false,
                placeholder: "Password",
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
                placeholder: "Confirm Password",
                readOnly: view,
              })}
            </div>
          )}
          {inputText({
            register,
            errors,
            label: "Pan Number",
            name: "panNumber",
            placeholder: "AAAAA1234Z",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Plan Type",
            name: "planType",
            placeholder: "Plan Type",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Bank Account Number",
            name: "bankAccountNumber",
            placeholder: "Bank Account Number",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "IFSC Code",
            name: "IFSCCode",
            placeholder: "IFSC Code",
            isRequired: false,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Profile Picture",
            name: "profilePicture",
            placeholder: "Profile Picture",
            isRequired: false,
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
          {view || edit ? (
            <>
              <div className="mb-3 p-3 border border-gray-400 rounded-md">
                <h4 className="font-medium text-base mb-3">Permissions</h4>
                {inputMultipleCheckBoxGroups({
                  register,
                  errors,
                  label: "Permission",
                  name: "permission",
                  placeholder: "Permission",
                  data:
                    permissionData &&
                    permissionData
                      .filter((item) => item.show)
                      .map((item) => ({
                        name: `${item.name}`,
                        method: methodConversion(item.method),
                        _id: item._id,
                      })),
                  isRequired: false,
                  readOnly: view,
                  checkedValues: checkedPermissions,
                })}
              </div>

              <div className="mb-3 p-3 border border-gray-400 rounded-md">
                <h4 className="font-medium text-base mb-3">Menus</h4>
                {inputMultipleCheckBox({
                  register,
                  errors,
                  label: "Menu",
                  name: "menu",
                  placeholder: "Menu",
                  data:
                    menuData &&
                    menuData.map((item) => ({
                      name: `${item.menu} - ${item.path}`,
                      _id: item._id,
                    })),
                  isRequired: false,
                })}
              </div>
            </>
          ) : (
            ""
          )}

          {view ? (
            ""
          ) : (
            <div className="flex gap-3">
              <button
                type="submit"
                className="min-w-[120px] inline-flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-0 h-8 text-center "
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
                className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-100  hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
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

export default FormChannelPartners;
