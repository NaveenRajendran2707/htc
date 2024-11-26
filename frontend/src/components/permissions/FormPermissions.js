import { Spinner, Message } from "..";
import {
  inputCheckBox,
  inputText,
  staticInputSelect,
} from "../../utils/dynamicForm";

const FormPermissions = ({
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

}) => {
  return (
    <>
      {isLoading ? (
        <Spinner />
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
          {staticInputSelect({
            register,
            errors,
            label: "Method",
            name: "method",
            placeholder: "Method",
            data: [
              { name: "GET" },
              { name: "POST" },
              { name: "PUT" },
              { name: "DELETE" },
            ],
            readOnly: view,
          })}

          {inputText({
            register,
            errors,
            label: "Route",
            name: "route",
            placeholder: "Route",
            readOnly: view,
          })}

          {inputCheckBox({
            register,
            errors,
            watch,
            name: "auth",
            label: "Auth",
            isRequired: false,
            placeholder: "Auth",
            readOnly: view,
          })}
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

export default FormPermissions;
