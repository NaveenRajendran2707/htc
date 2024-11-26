import { Spinner, Message } from "..";
import { dynamicInputSelect } from "../../utils/dynamicForm";

const FormUserRoles = ({
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
  dataRoles,
  dataUsers,
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
          {dynamicInputSelect({
            register,
            errors,
            label: "User",
            name: "user",
            value: "userID",
            data:
              dataUsers &&
              dataUsers.data &&
              dataUsers.data.filter((user) => user.confirmed && !user.blocked),
            placeholder: "User",
            readOnly: view,
          })}

          {dynamicInputSelect({
            register,
            errors,
            label: "Role",
            name: "role",
            placeholder: "Role",
            data: dataRoles && dataRoles.data,
            value: "name",
            readOnly: view,
          })}

          {view ? "" :
          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-0 h-8 text-center "
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

export default FormUserRoles;
