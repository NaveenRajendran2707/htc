import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useCustomerGroupsHook from "../../../api/customerGroups";
import {
  Spinner,
  ViewCustomerGroups,
  Pagination,
  FormCustomerGroups,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const CustomerGroups = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getCustomerGroups,
    postCustomerGroup,
    updateCustomerGroup,
    deleteCustomerGroup,
  } = useCustomerGroupsHook({
    page,
    q,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { data, isLoading, isError, error, refetch } = getCustomerGroups;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateCustomerGroup;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteCustomerGroup;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postCustomerGroup;

  const formCleanHandler = () => {
    setEdit(false);
    reset();
  };

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler();
  }, [isSuccessPost, isSuccessUpdate]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!q) refetch();
  }, [q]);

  const searchHandler = (e) => {
    e.preventDefault();
    refetch();
    setPage(1);
  };

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)));
  };

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          customerGroupSerialNo: data.customerGroupSerialNo,
          customerGroup: data.customerGroup,
          customerSubGroup: data.customerSubGroup,
        })
      : mutateAsyncPost(data);
      setIsModalOpen(false);
  };

  const viewHandler = (customerGroup) => {
    setId(customerGroup._id);
    setView(true);
    setValue("customerGroupSerialNo", customerGroup.customerGroupSerialNo);
    setValue("customerGroup", customerGroup.customerGroup);
    setValue("customerSubGroup", customerGroup.customerSubGroup);
  };

  const editHandler = (customerGroup) => {
    setId(customerGroup._id);
    setView(false);
    setEdit(true);
    setValue("customerGroupSerialNo", customerGroup.customerGroupSerialNo);
    setValue("customerGroup", customerGroup.customerGroup);
    setValue("customerSubGroup", customerGroup.customerSubGroup);
  };

  return (
    <>
      <Helmet>
        <title>Customer Groups | HTC</title>
        <meta property="og:title" content="Customer Groups" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Customer Group has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Customer Group has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Customer Group has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewCustomerGroups
          data={data}
          viewHandler={viewHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setView={setView}
        />
      )}

      <div className="ms-auto text-end">
        <Pagination data={data} setPage={setPage} />
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        transition
        className="realtive z-[1000] transition duration-100 ease-linear data-[closed]:opacity-0"
      >
        <div className="fixed z-[1000] inset-0 flex w-screen justify-center items-center p-2">
          <DialogPanel className="w-full max-w-[800px] max-h-[calc(100vh_-_1rem)] overflow-auto flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit
                  ? "Edit Customer Group"
                  : view
                  ? "View Customer Group"
                  : "Add Customer Group"}
              </h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-1"
                aria-label="Close"
                onClick={() => {
                  setIsModalOpen(false);
                  formCleanHandler();
                }}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
            <div className="flex-1 overflow-auto px-3 pb-3">
              <FormCustomerGroups
                edit={edit}
                view={view}
                formCleanHandler={formCleanHandler}
                isLoading={isLoading}
                isError={isError}
                errors={errors}
                isLoadingUpdate={isLoadingUpdate}
                isLoadingPost={isLoadingPost}
                register={register}
                handleSubmit={handleSubmit}
                submitHandler={submitHandler}
                setIsModalOpen={setIsModalOpen}
                watch={watch}
                error={error}
                nextSequenceNumber={data && data.nextSequenceNumber}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/50" />
      </Dialog>
    </>
  );
};

export default CustomerGroups;
