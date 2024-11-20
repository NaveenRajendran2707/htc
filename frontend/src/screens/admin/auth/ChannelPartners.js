import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useChannelPartnersHook from "../../../api/channelPartners";
import useStatesHook from "../../../api/states";
import useCitiesHook from "../../../api/cities";
import useUsersHook from "../../../api/users";
import {
  ViewChannelPartners,
  ViewStates,
  Pagination,
  FormChannelPartners,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const ChannelPartners = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getChannelPartners,
    postChannelPartner,
    updateChannelPartner,
    deleteChannelPartner,
  } = useChannelPartnersHook({
    page,
    q,
  });

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

  const { data, isLoading, isError, error, refetch } = getChannelPartners;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateChannelPartner;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteChannelPartner;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postChannelPartner;

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
          channelPartnerSerialNo: data.channelPartnerSerialNo,
          registrationDate: data.registrationDate,
          state: data.state,
          city: data.city,
          introductionID: data.introductionID,
          channelPartnerID: data.channelPartnerID,
          userID: data.userID,
          name: data.name,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          pincode: data.pincode,
          mobileNumber: data.mobileNumber,
          phoneNumber: data.phoneNumber,
          emailID: data.emailID,
          panNumber: data.panNumber,
          planType: data.planType,
          bankAccountNumber: data.bankAccountNumber,
          IFSCCode: data.IFSCCode,
          profilePicture: data.profilePicture,
          blocked: data.blocked,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (channelpartner) => {
    setId(channelpartner._id);
    setView(true);
    setValue("channelPartnerSerialNo", channelpartner.channelPartnerSerialNo);
    setValue("registrationDate", channelpartner.registrationDate);
    setValue("state", channelpartner.state);
    setValue("city", channelpartner.city);
    setValue("introductionID", channelpartner.introductionID);
    setValue("channelPartnerID", channelpartner.channelPartnerID);
    setValue("userID", channelpartner.userID);
    setValue("name", channelpartner.name);
    setValue("address1", channelpartner.address1);
    setValue("address2", channelpartner.address2);
    setValue("address3", channelpartner.address3);
    setValue("pincode", channelpartner.pincode);
    setValue("mobileNumber", channelpartner.mobileNumber);
    setValue("phoneNumber", channelpartner.phoneNumber);
    setValue("emailID", channelpartner.emailID);
    setValue("panNumber", channelpartner.panNumber);
    setValue("planType", channelpartner.planType);
    setValue("bankAccountNumber", channelpartner.bankAccountNumber);
    setValue("IFSCCode", channelpartner.IFSCCode);
    setValue("profilePicture", channelpartner.profilePicture);
    setValue("blocked", channelpartner.blocked);
  };

  const editHandler = (channelpartner) => {
    setId(channelpartner._id);
    setView(false);
    setEdit(true);
    setValue("channelPartnerSerialNo", channelpartner.channelPartnerSerialNo);
    setValue("registrationDate", channelpartner.registrationDate);
    setValue("state", channelpartner.state);
    setValue("city", channelpartner.city);
    setValue("introductionID", channelpartner.introductionID);
    setValue("channelPartnerID", channelpartner.channelPartnerID);
    setValue("userID", channelpartner.userID);
    setValue("name", channelpartner.name);
    setValue("address1", channelpartner.address1);
    setValue("address2", channelpartner.address2);
    setValue("address3", channelpartner.address3);
    setValue("pincode", channelpartner.pincode);
    setValue("mobileNumber", channelpartner.mobileNumber);
    setValue("phoneNumber", channelpartner.phoneNumber);
    setValue("emailID", channelpartner.emailID);
    setValue("panNumber", channelpartner.panNumber);
    setValue("planType", channelpartner.planType);
    setValue("bankAccountNumber", channelpartner.bankAccountNumber);
    setValue("IFSCCode", channelpartner.IFSCCode);
    setValue("profilePicture", channelpartner.profilePicture);
    setValue("blocked", channelpartner.blocked);
  };

  return (
    <>
      <Helmet>
        <title>Channel Partners | HTC</title>
        <meta property="og:title" content="ChannelPartners" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Channel Partner has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Channel Partner has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Channel Partner has been created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewChannelPartners
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
        <div className="fixed z-[1000] inset-0 flex w-screen justify-end p-4">
          <DialogPanel className="max-w-[800px] w-full flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center py-4 px-6"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit
                  ? "Edit Channel Partner"
                  : view
                  ? "View Channel Partner"
                  : "Add Channel Partner"}
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
              <FormChannelPartners
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
                states={getState && getState.data}
                cities={getCity && getCity.data}
                user={users && users.data}
                nextSequenceNumber={data && data.nextSequenceNumber}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/30" />
      </Dialog>
    </>
  );
};

export default ChannelPartners;
