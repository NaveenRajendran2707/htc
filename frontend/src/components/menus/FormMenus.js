import { Spinner, Message } from "..";
import { inputText, inputTextArea } from "../../utils/dynamicForm";

const FormMenus = ({
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
          {inputText({
            register,
            errors,
            label: "Menu",
            name: "menu",
            placeholder: "Menu",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Path",
            name: "path",
            placeholder: "Path",
            readOnly: view,
          })}

          {inputTextArea({
            register,
            errors,
            label: "Description",
            name: "description",
            placeholder: "Description",
            isRequired: false,
            readOnly: view,
          })}
          {view ? "" :
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
                <span>
                  {edit ? 'Update' : 'Save' }
                </span>
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
        }
        </form>
      )}
    </>
  );
};

export default FormMenus;
