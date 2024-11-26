import { Message } from "../../components";
import {
  inputHidden,
  inputCheckBox,
  inputSwitch,
  inputEmail,
  inputPassword,
  inputText,
  staticInputSelect,
  inputDate,
  dynamicInputSelect,
  inputMultipleCheckBoxGroups,
  inputMultipleCheckBox
} from "../../utils/dynamicForm";

const methodConversion = (methodName) => {
  switch(methodName){
    case 'GET': return 'List';
    case 'POST': return 'Add';
    case 'PUT': return 'Edit';
    case 'DELETE': return 'Delete';
  }  
}

export const FormEmployees = ({
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
  departmentData,
  designationData,
  stateData,
  cityData,
  setIsModalOpen,
  permissionData,
  menuData,  
  nextSequenceNumber
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
            name: "userType",
            placeholder: "User Type",
            value: "Client",
            readOnly: true,
          })}
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
            value: "USR"+String(nextSequenceNumber > 0 ? nextSequenceNumber : 1).padStart(5, '0'),
            readOnly: true,
          })} 
          {inputText({
            register,
            errors,
            label: "Employee ID",
            name: "employeeID",
            placeholder: "Employee ID",
            value: "EMP"+String(nextSequenceNumber > 0 ? nextSequenceNumber : 1).padStart(5, '0'),
            readOnly: true,
          })}          
          {dynamicInputSelect({
            register,
            errors,
            label: "Department",
            name: "department",
            placeholder: "Department",
            isRequired: false,
            data: departmentData && departmentData,
            value: "department",
            readOnly: view,
          })}
          {dynamicInputSelect({
            register,
            errors,
            label: "Designation",
            name: "designation",
            placeholder: "Designation",
            isRequired: false,
            data: designationData && designationData,
            value: "designation",
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
          {dynamicInputSelect({
            register,
            errors,
            label: "State",
            name: "state",
            placeholder: "State",
            isRequired: false,            
            data: stateData && stateData,
            value: "stateName",
            readOnly: view,
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
            label: "Mobile no.",
            name: "mobile",
            placeholder: "044 12345678",
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
            label: "Pan No.",
            name: "pan",
            placeholder: "AAAAA1234Z",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "PF No.",
            name: "pf",
            placeholder: "KN/PY/1234567/987",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "ESI No.",
            name: "esi",
            placeholder: "31-00-123456-000-0001",
            readOnly: view,
          })}
          {inputDate({
            register,
            errors,
            label: "DOB",
            name: "dob",
            placeholder: "11/11/1999",
            readOnly: view,
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Salary Schedule Type",
            name: "salaryscheduletype",
            placeholder: "Salary Schedule Type",
            isRequired: false,
            data: [{ name: "Weekly" }, { name: "Monthly" }],
            readOnly: view,
          })}
          {view || edit ? <div></div> : <div>
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
          }
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

          {view || edit ? 
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
                    permissionData.filter(item => item.show).map((item) => ({                  
                        name: `${item.name}`,
                        method: methodConversion(item.method),
                        _id: item._id,
                    })),
                  isRequired: false,
                  readOnly: view,
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
          : ""
          }

          {view ? "" :
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
                  <span>
                    {edit ? 'Update' : 'Save' }
                  </span>
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
          }
        </form>
      )}
    </>
  );
};

export default FormEmployees;
