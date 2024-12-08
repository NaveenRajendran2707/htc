import { useEffect, useState } from "react";
import { Message } from "../../components";
import {
  inputHidden,
  inputCheckBox,
  inputEmail,
  inputPassword,
  inputText,
  staticInputSelect,
  inputDate,
  dynamicInputSelect,
  inputMultipleCheckBoxGroups,
  inputMultipleCheckBoxSwitchGroups,
  inputMultipleCheckBoxGroupsChange,
  inputMultipleCheckBox,
  inputSwitch,
  staticInputSelectState
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

export const FormUsers = ({
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
  stateData,
  cityData,
  setIsModalOpen,
  permissionData,
  menuData,
  nextSequenceNumber,
}) => {
  const getDynamicLabel = (field, value) => {
    if (field === "confirmed") {
      return value ? "Unapproved" : "Approved";
    }
    if (field === "blocked") {
      return value ? "Inactive" : "Active";
    }
    return field;
  };
  const permissions = watch("permission") || [];
  const [checkedPermissions, setCheckedPermissions] = useState([]);

  useEffect(() => {
    setCheckedPermissions(permission);
  }, [permissions]);

  const [filteredMenus, setFilteredMenus] = useState([]);
  const permission_get = localStorage.getItem("permission_get")
    ? JSON.parse(localStorage.getItem("permission_get"))
    : null;
  const [permission, setPermission] = useState(permission_get || []);
  const menu_get = localStorage.getItem("menu_get")
    ? JSON.parse(localStorage.getItem("menu_get"))
    : null;
  const [menu, setMenu] = useState(menu_get || []);
  const [checkTrue, setCheckTrue] = useState(false);
  useEffect(() => {
    if (!checkTrue && menu_get) {
      localStorage.setItem("menu_post", JSON.stringify(menu_get));
      setMenu(menu_get);
    }
  }, [checkTrue]);
  const handleCheckBox = (e) => {
    setCheckTrue(true);
    const selectedPermissionId = e.target.value;
    setCheckTrue(true);
    setPermission((prevPermissions) => [
      ...prevPermissions,
      selectedPermissionId,
    ]);
    const selectedPermission = permissionData?.find(
      (item) => item._id === selectedPermissionId
    );
    if (selectedPermission) {
      const matchingMenus = menuData?.filter(
        (menuItem) => menuItem.name === selectedPermission.name
      );
      setFilteredMenus((prevFilteredMenus) => {
        const newFilteredMenus = [...prevFilteredMenus];
        matchingMenus?.forEach((menuItem) => {
          if (!newFilteredMenus.some((menu) => menu._id === menuItem._id)) {
            newFilteredMenus.push({ _id: menuItem._id });
          }
        });
        return newFilteredMenus;
      });
      const menuIds = matchingMenus?.map((menu) => menu._id) || [];
      setMenu((prevMenu) => {
        const updatedMenu = Array.from(new Set([...prevMenu, ...menuIds]));
        console.log("Updated Menu:", updatedMenu);
        localStorage.setItem("menu_post", JSON.stringify(updatedMenu));
        return updatedMenu;
      });
    }
  };
  const [city, setCity] = useState([]);
  const [getTrue, setTrue] = useState(false);
  const handleStateChange = (e) => {
    setTrue(true);
    const id = e.target.selectedOptions[0].dataset.id;
    if (id !== "") {
      const filteredCities = cityData
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
            label: "User ID",
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
          <div className="grid grid-cols-12 gap-3">
            {inputText({
              register,
              errors,
              label: "First Name",
              name: "firstName",
              placeholder: "First Name",
              readOnly: view,
              wrapperClass: "col-span-6",
            })}
            {inputText({
              register,
              errors,
              label: "Last Name",
              name: "lastName",
              placeholder: "Last Name",
              readOnly: view,
              wrapperClass: "col-span-6",
            })}
          </div>
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
          <div className="grid grid-cols-12 gap-3">
          {staticInputSelectState({
            register,
            errors,
            label: "State",
            name: "state",
            placeholder: "State",
            isRequired: false,
            data:
              stateData &&
              stateData.map((item) => ({
                name: item.stateName,
                _id: item._id,
              })),
            onChange: handleStateChange,
            readOnly: view,
            wrapperClass: "col-span-4",
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
            wrapperClass: "col-span-4",
          })}
            {/* {dynamicInputSelect({
              register,
              errors,
              label: "State",
              name: "state",
              placeholder: "State",
              isRequired: false,
              data: stateData && stateData,
              value: "stateName",
              readOnly: view,
              wrapperClass: "col-span-4",
            })}
            {dynamicInputSelect({
              register,
              errors,
              label: "City",
              name: "city",
              placeholder: "City",
              isRequired: false,
              data: cityData && cityData,
              value: "cityName",
              readOnly: view,
              wrapperClass: "col-span-4",
            })} */}
            {inputText({
              register,
              errors,
              label: "Pin code",
              name: "pincode",
              placeholder: "600 078",
              readOnly: view,
              wrapperClass: "col-span-4",
            })}
          </div>
          <div className="grid grid-cols-12 gap-3">
            {inputText({
              register,
              errors,
              label: "Mobile no.",
              name: "mobile",
              placeholder: "044 12345678",
              readOnly: view,
              wrapperClass: "col-span-6",
            })}
            {inputEmail({
              register,
              errors,
              label: "Email ID",
              name: "email",
              placeholder: "Email",
              readOnly: view,
              wrapperClass: "col-span-6",
            })}
          </div>
          {inputText({
            register,
            errors,
            label: "Pan No.",
            name: "pan",
            placeholder: "AAAAA1234Z",
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
          {inputSwitch({
            register,
            errors,
            watch,
            name: "confirmed",
            label: getDynamicLabel("confirmed", watch("confirmed")),
            isRequired: false,
            placeholder: "Confirmed",
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
                {/* {inputMultipleCheckBoxGroupsChange({
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
                  onChange: handleCheckBox,
                })} */}
                {inputMultipleCheckBoxSwitchGroups({
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
                  onChange: handleCheckBox,
                })}
              </div>

              {/* <div className="mb-3 p-3 border border-gray-400 rounded-md">
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
              </div> */}
            </>
          ) : (
            ""
          )}

          {view ? (
            ""
          ) : (
            <div className="flex gap-2">
              <button
                type="submit"
                className="min-w-[120px] text-white bg-blue-600 border-1 border-transparent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-md text-sm px-3 py-1 text-center "
                disabled={isLoadingPost || isLoadingUpdate}
              >
                {isLoadingPost || isLoadingUpdate ? (
                  <span
                    className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"
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
                className="px-3 py-1 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                onClick={() => {
                  localStorage.removeItem("menu_post");
                  localStorage.removeItem("menu_get");
                  localStorage.removeItem("permission_get");
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

export default FormUsers;
