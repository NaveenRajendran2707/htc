import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useBrandHook from "../../../api/brand";
import {
  Spinner,
  ViewBrand,
  Pagination,
  FormBrand,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Brand = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getBrands,
    postBrand,
    updateBrand,
    deleteBrand,
  } = useBrandHook({
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

  const { data, isLoading, isError, error, refetch } = getBrands;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateBrand;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteBrand;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postBrand;

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
    console.log('data', data)
    edit
      ? mutateAsyncUpdate({
          _id: id,
          brandSerialNo: data.brandSerialNo,
          brandName: data.brandName,
          discount: data.discount,
          margin: data.margin,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (brand) => {
    setId(brand._id);
    setView(true);
    setValue("brandSerialNo", brand.brandSerialNo);
    setValue("brandName", brand.brandName);
    setValue("discount", brand.discount);
    setValue("margin", brand.margin);
  };

  const editHandler = (brand) => {
    setId(brand._id);
    setView(false);
    setEdit(true);
    setValue("brandSerialNo", brand.brandSerialNo);
    setValue("brandName", brand.brandName);
    setValue("discount", brand.discount);
    setValue("margin", brand.margin);
  };

  return (
    <>
      <Helmet>
        <title>Brand | HTC</title>
        <meta property="og:title" content="Brand" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Brand has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Brand has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Brand has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewBrand
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
          <DialogPanel className="max-w-[800px] w-full flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit ? "Edit Brand" : view ? "View Brand" : "Add Brand"}
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
              <FormBrand
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

export default Brand;
