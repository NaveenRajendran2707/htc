import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useBranchesHook from "../../../api/branches";
import useCompaniesHook from "../../../api/companies";
import useStatesHook from "../../../api/states";
import useCitiesHook from "../../../api/cities";
import {
  ViewBranches,
  Pagination,
  FormBranches,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Branches = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getBranches, postBranch, updateBranch, deleteBranch } =
    useBranchesHook({
      page,
      q,
    });

  const { getCompanies } = useCompaniesHook({
    page,
    q,
  });

  const { data: companyId } = getCompanies;
  console.log("companyId", companyId);

  const { getStates } = useStatesHook({
    page,
    q,
  });

  const { data: getState } = getStates;

  const { getCities } = useCitiesHook({
    page,
    q,
  });

  const { data: getCity } = getCities;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmed: true,
      blocked: false,
    },
  });

  const { data, isLoading, isError, error, refetch } = getBranches;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateBranch;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteBranch;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postBranch;

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
          branchSerialNo: data.branchSerialNo,
          registrationDate: data.registrationDate,
          companyID: data.companyID,
          city: data.city,
          branchID: data.branchID,
          user: data.user,
          branchName: data.branchName,
          branchShortName: data.branchShortName,
          gSTINNumber: data.gSTINNumber,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          pincode: data.pincode,
          mobileNumber: data.mobileNumber,
          phoneNumber: data.phoneNumber,
          email: data.email,
          logo: data.logo,
          watermark: data.watermark,
          blocked: data.blocked,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (branch) => {
    setId(branch._id);
    setView(true);
    setValue("branchSerialNo", branch.branchSerialNo);
    setValue("registrationDate", branch.registrationDate);
    setValue("companyID", branch.companyID);
    setValue("city", branch.city);
    setValue("branchID", branch.branchID);
    setValue("user", branch.user);
    setValue("branchName", branch.branchName);
    setValue("branchShortName", branch.branchShortName);
    setValue("gSTINNumber", branch.gSTINNumber);
    setValue("address1", branch.address1);
    setValue("address2", branch.address2);
    setValue("address3", branch.address3);
    setValue("pincode", branch.pincode);
    setValue("mobileNumber", branch.mobileNumber);
    setValue("phoneNumber", branch.phoneNumber);
    setValue("email", branch.email);
    setValue("logo", branch.logo);
    setValue("watermark", branch.watermark);
    setValue("blocked", branch.blocked);
  };

  const editHandler = (branch) => {
    setId(branch._id);
    setView(false);
    setEdit(true);
    setValue("branchSerialNo", branch.branchSerialNo);
    setValue("registrationDate", branch.registrationDate);
    setValue("companyID", branch.companyID);
    setValue("city", branch.city);
    setValue("branchID", branch.branchID);
    setValue("user", branch.user);
    setValue("branchName", branch.branchName);
    setValue("branchShortName", branch.branchShortName);
    setValue("gSTINNumber", branch.gSTINNumber);
    setValue("address1", branch.address1);
    setValue("address2", branch.address2);
    setValue("address3", branch.address3);
    setValue("pincode", branch.pincode);
    setValue("mobileNumber", branch.mobileNumber);
    setValue("phoneNumber", branch.phoneNumber);
    setValue("email", branch.email);
    setValue("logo", branch.logo);
    setValue("watermark", branch.watermark);
    setValue("blocked", branch.blocked);
  };

  return (
    <>
      <Helmet>
        <title>Branches | HTC</title>
        <meta property="og:title" content="Branches" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Branch has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Branch has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Branch has been created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewBranches
          data={data}
          viewHandler={viewHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchHandler={searchHandler}
          setView={setView}
        />
      )}

      <div className="my-3">
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
                {edit ? "Edit Branch" : view ? "View Branch" : "Add Branch"}
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
              <FormBranches
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
                company={companyId && companyId.data}
                states={getState && getState.data}
                cities={getCity && getCity.data}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/50" />
      </Dialog>
    </>
  );
};

export default Branches;
