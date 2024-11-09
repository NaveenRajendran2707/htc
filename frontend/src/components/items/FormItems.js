import { Spinner, Message } from "..";
import {
  inputHidden,
  inputCheckBox,
  inputText,
  dynaimcInputSelectField,
} from "../../utils/dynamicForm";

const FormItems = ({
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
  nextSequenceNumber,
  branch,
  group,
  category,
  uom,
  hsn,
  gst,
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
            label: "Item Serial No",
            name: "itemSerialNo",
            placeholder: "Item Serial No",
            value:
              "ITM" +
              String(nextSequenceNumber > 0 ? nextSequenceNumber : 1).padStart(
                5,
                "0"
              ),
            readOnly: false,
          })}
          {dynaimcInputSelectField({
            register,
            errors,
            label: "Branch Name",
            name: "branchName",
            placeholder: "Branch Name",
            isRequired: false,
            data: branch && branch,
            value: "branchName",
            readOnly: view,
          })}
          {dynaimcInputSelectField({
            register,
            errors,
            label: "Group Name",
            name: "groupName",
            placeholder: "Group Name",
            isRequired: true,
            data: group && group,
            value: "itemGroup",
            readOnly: view,
          })}
          {dynaimcInputSelectField({
            register,
            errors,
            label: "Product Category",
            name: "productCategory",
            placeholder: "Product Category",
            isRequired: true,
            data: category && category,
            value: "brandName",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Name",
            name: "name",
            placeholder: "Name",
            isRequired: true,
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Alias Name",
            name: "aliasName",
            placeholder: "Alias Name",
            readOnly: view,
          })}
          {dynaimcInputSelectField({
            register,
            errors,
            label: "Uom",
            name: "uom",
            placeholder: "Uom",
            isRequired: true,
            data: uom && uom,
            value: "subUnit",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Cost",
            name: "cost",
            placeholder: "Cost",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "List Price",
            name: "listPrice",
            placeholder: "List Price",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Discount",
            name: "discount",
            placeholder: "Discount",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Margin Price",
            name: "marginPrice",
            placeholder: "Margin Price",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "MRP",
            name: "MRP",
            placeholder: "MRP",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Batch No",
            name: "batchNo",
            placeholder: "Batch No",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Expiry Date",
            name: "expiryDate",
            placeholder: "Expiry Date",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Free Gift Qty",
            name: "freeGiftQty",
            placeholder: "Free Gift Qty",
            readOnly: view,
          })}
          {dynaimcInputSelectField({
            register,
            errors,
            label: "HSN Code",
            name: "HSNCode",
            placeholder: "HSN Code",
            isRequired: false,
            data: hsn && hsn,
            value: "hSNCode",
            readOnly: view,
          })}
          {dynaimcInputSelectField({
            register,
            errors,
            label: "GST Tax Rate",
            name: "GSTTaxRate",
            placeholder: "GST Tax Rate",
            isRequired: false,
            data: gst && gst,
            value: "gSTTax",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Re-Order Qty",
            name: "reOrderQty",
            placeholder: "Re-Order Qty",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Opening Stock Qty",
            name: "openingStockQty",
            placeholder: "Opening Stock Qty",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Opening Stock Value",
            name: "openingStockValue",
            placeholder: "Opening Stock Value",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Product Image",
            name: "productImage",
            placeholder: "Product Image",
            readOnly: view,
          })}
          {inputCheckBox({
            register,
            errors,
            name: "blocked",
            label: "Status (Active/Inactive)",
            isRequired: false,
            placeholder: "Status",
            readOnly: view,
          })}
          {view ? (
            ""
          ) : (
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
                  <span>{edit ? "Update" : "Save"}</span>
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
          )}
        </form>
      )}
    </>
  );
};

export default FormItems;
