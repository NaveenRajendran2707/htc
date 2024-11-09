import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useCompaniesHook from "../../../api/companies";
import useServiceHook from "../../../api/serviceTypes";
import useStatesHook from "../../../api/states";
import useCitiesHook from "../../../api/cities";
import useUsersHook from "../../../api/users";
import {
  ViewCompanies,
  Pagination,
  FormCompanies,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getCompanies, postCompany, updateCompany, deleteCompany } =
    useCompaniesHook({
      page,
      q,
    });

  const { getServiceTypes } = useServiceHook({
    page,
    q,
  });

  const { data: services } = getServiceTypes;

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

  const { getUsers } = useUsersHook({
    page,
    q,
  });

  const { data: users } = getUsers;
  console.log("users", users);

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

  const { data, isLoading, isError, error, refetch } = getCompanies;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateCompany;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteCompany;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postCompany;

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
          companySerialNo: data.companySerialNo,
          registrationDate: data.registrationDate,
          introductionID: data.introductionID,
          city: data.city,
          companyID: data.companyID,
          typeofService: data.typeofService,
          companyType: data.companyType,
          user: data.user,
          companyName: data.companyName,
          companyShortName: data.companyShortName,
          gSTINNumber: data.gSTINNumber,
          companyAdminName: data.companyAdminName,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          pincode: data.pincode,
          mobileNumber1: data.mobileNumber1,
          mobileNumber2: data.mobileNumber2,
          phoneNumber: data.phoneNumber,
          email: data.email,
          logo: data.logo,
          watermark: data.watermark,
          blocked: data.blocked,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (company) => {
    setId(company._id);
    setView(true);
    setValue("companySerialNo", company.companySerialNo);
    setValue("registrationDate", company.registrationDate);
    setValue("introductionID", company.introductionID);
    setValue("city", company.city);
    setValue("companyID", company.companyID);
    setValue("typeofService", company.typeofService);
    setValue("companyType", company.companyType);
    setValue("user", company.user);
    setValue("companyName", company.companyName);
    setValue("companyShortName", company.companyShortName);
    setValue("gSTINNumber", company.gSTINNumber);
    setValue("companyAdminName", company.companyAdminName);
    setValue("address1", company.address1);
    setValue("address2", company.address2);
    setValue("address3", company.address3);
    setValue("pincode", company.pincode);
    setValue("mobileNumber1", company.mobileNumber1);
    setValue("mobileNumber2", company.mobileNumber2);
    setValue("phoneNumber", company.phoneNumber);
    setValue("email", company.email);
    setValue("logo", company.logo);
    setValue("watermark", company.watermark);
    setValue("blocked", company.blocked);
  };

  const editHandler = (company) => {
    setId(company._id);
    setView(false);
    setEdit(true);
    setValue("companySerialNo", company.companySerialNo);
    setValue("registrationDate", company.registrationDate);
    setValue("introductionID", company.introductionID);
    setValue("city", company.city);
    setValue("companyID", company.companyID);
    setValue("typeofService", company.typeofService);
    setValue("companyType", company.companyType);
    setValue("user", company.user);
    setValue("companyName", company.companyName);
    setValue("companyShortName", company.companyShortName);
    setValue("gSTINNumber", company.gSTINNumber);
    setValue("companyAdminName", company.companyAdminName);
    setValue("address1", company.address1);
    setValue("address2", company.address2);
    setValue("address3", company.address3);
    setValue("pincode", company.pincode);
    setValue("mobileNumber1", company.mobileNumber1);
    setValue("mobileNumber2", company.mobileNumber2);
    setValue("phoneNumber", company.phoneNumber);
    setValue("email", company.email);
    setValue("logo", company.logo);
    setValue("watermark", company.watermark);
    setValue("blocked", company.blocked);
  };

  return (
    <>
      <Helmet>
        <title>Companies | HTC</title>
        <meta property="og:title" content="Companies" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Company has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Company has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Company has been created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewCompanies
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
        <div className="fixed z-[1000] inset-0 flex w-screen justify-end p-4">
          <DialogPanel className="max-w-[800px] w-full flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center py-4 px-6"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit ? "Edit Company" : view ? "View Company" : "Add Company"}
              </h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-2"
                aria-label="Close"
                onClick={() => {
                  setIsModalOpen(false);
                  formCleanHandler();
                }}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
            <div className="flex-1 overflow-auto py-4 px-6">
              <FormCompanies
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
                service={services && services.data}
                states={getState && getState.data}
                cities={getCity && getCity.data}
                user={users && users.data}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/30" />
      </Dialog>
    </>
  );
};

export default Companies;
