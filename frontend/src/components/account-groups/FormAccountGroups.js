import { Spinner, Message } from "..";
import { inputHidden, inputText, inputTextArea } from "../../utils/dynamicForm";

const FormServiceTypes = ({
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
  nextSequenceNumber
}) => {
  return (
    <>
      {isLoading ? (
        <Spinner />
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
            label: "Service Serial No",
            name: "serviceSerialNo",
            placeholder: "Service Serial No",
            value: "SER"+String(nextSequenceNumber > 0 ? nextSequenceNumber : 1).padStart(5, '0'),
            readOnly: true,
          })}
          {inputText({
            register,
            errors,
            label: "Service Name",
            name: "serviceName",
            placeholder: "Service Name",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Perticular",
            name: "particular",
            placeholder: "Perticular",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Fees",
            name: "fees",
            placeholder: "Fees",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Status",
            name: "status",
            placeholder: "Status",
            readOnly: view,
            value: "Active"
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

export default FormServiceTypes;
