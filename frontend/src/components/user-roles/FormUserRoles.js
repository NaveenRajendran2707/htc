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
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
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

export default FormUserRoles;
