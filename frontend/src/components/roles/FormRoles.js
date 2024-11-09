import { Message } from "..";
import {
  inputText,
  inputTextArea,
  inputMultipleCheckBox,
  inputMultipleCheckBoxGroups,
} from "../../utils/dynamicForm";

const methodConversion = (methodName) => {
  switch(methodName){
    case 'GET': return 'List';
    case 'POST': return 'Add';
    case 'PUT': return 'Edit';
    case 'DELETE': return 'Delete';
  }  
}

const FormRoles = ({
  edit,
  view,
  formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  isLoadingUpdate,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  error,
  permissionData,
  menuData,
  setIsModalOpen,
}) => {
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
          {inputText({
            register,
            errors,
            label: "Name",
            name: "name",
            placeholder: "Name",            
            readOnly: view,
          })}

          {inputTextArea({
            register,
            errors,
            label: "Description",
            name: "description",
            placeholder: "Description",
            readOnly: view,
          })}

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

          {view ? "" :
          <div className="flex gap-3">
            <button
              type="submit"
              className="min-w-[120px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
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
              className="px-4 py-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
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

export default FormRoles;
