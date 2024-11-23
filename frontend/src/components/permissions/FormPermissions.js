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
              className="px-4 py-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-1 border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
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
