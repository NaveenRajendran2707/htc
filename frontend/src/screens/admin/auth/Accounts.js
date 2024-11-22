import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useAccountsHook from "../../../api/accounts";
import usePermissionsHook from "../../../api/permissions";
import useMenusHook from "../../../api/menus";
import useStatesHook from "../../../api/states";
import useCitiesHook from "../../../api/cities";
import useUsersHook from "../../../api/users";
import useAccountGroupsHook from "../../../api/accountGroups";
import {
  ViewAccounts,
  ViewStates,
  Pagination,
  FormAccounts,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Accounts = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getAccounts, postAccount, updateAccount, deleteAccount } =
    useAccountsHook({
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

  const { getAccountGroups } = useAccountGroupsHook({
    page,
    q,
  });

  const { data: account } = getAccountGroups;

  const { getPermissions } = usePermissionsHook({
    limit: 1000000,
  });
  const { getMenus } = useMenusHook({
    limit: 1000000,
  });

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

  const { data, isLoading, isError, error, refetch } = getAccounts;
  const { data: permissionData } = getPermissions;
  const { data: menuData } = getMenus;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateAccount;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteAccount;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postAccount;

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
          accountSerialNo: data.accountSerialNo,
          accountGroup: data.accountGroup,
          accountName: data.accountName,
          aliasName: data.aliasName,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          mobileNumber: data.mobileNumber,
          email: data.email,
          GSTINNo: data.GSTINNo,
          panNo: data.panNo,
          transportName: data.transportName,
          openingBalance: data.openingBalance,
          password: data.password,
          blocked: data.blocked,
          permission: data.permission,
          menu: data.menu,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (account) => {
    setId(account._id);
    setView(true);
    setValue("accountSerialNo", account.accountSerialNo);
    setValue("accountGroup", account.accountGroup);
    setValue("accountName", account.accountName);
    setValue("aliasName", account.aliasName);
    setValue("address1", account.address1);
    setValue("address2", account.address2);
    setValue("address3", account.address3);
    setValue("state", account.state);
    setValue("firstName", account.user?.firstName);
    setValue("lastName", account.user?.lastName);
    setValue("city", account.city);
    setValue("pincode", account.pincode);
    setValue("mobileNumber", account.mobileNumber);
    setValue("email", account.user?.email);
    setValue("GSTINNo", account.GSTINNo);
    setValue("panNo", account.panNo);
    setValue("transportName", account.transportName);
    setValue("openingBalance", account.openingBalance);
    setValue("password", account.password);
    setValue("blocked", account.blocked);
    setValue("permission", account.user?.permission);
    setValue("menu", account.user?.menu);
  };

  const editHandler = (account) => {
    setId(account._id);
    setView(false);
    setEdit(true);
    setValue("accountSerialNo", account.accountSerialNo);
    setValue("accountGroup", account.accountGroup);
    setValue("accountName", account.accountName);
    setValue("aliasName", account.aliasName);
    setValue("firstName", account.user?.firstName);
    setValue("lastName", account.user?.lastName);
    setValue("address1", account.address1);
    setValue("address2", account.address2);
    setValue("address3", account.address3);
    setValue("state", account.state);
    setValue("city", account.city);
    setValue("pincode", account.pincode);
    setValue("mobileNumber", account.mobileNumber);
    setValue("email", account.user?.email);
    setValue("GSTINNo", account.GSTINNo);
    setValue("panNo", account.panNo);
    setValue("transportName", account.transportName);
    setValue("openingBalance", account.openingBalance);
    setValue("password", account.password);
    setValue("blocked", account.blocked);
    setValue("permission", account.user?.permission);
    setValue("menu", account.user?.menu);
  };

  return (
    <>
      <Helmet>
        <title>Accounts | HTC</title>
        <meta property="og:title" content="Accounts" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Account has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Account has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Account has been created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewAccounts
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
                {edit ? "Edit Account" : view ? "View Account" : "Add Account"}
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
              <FormAccounts
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
                accounts={account && account.data}
                permissionData={permissionData && permissionData.data}
                menuData={menuData && menuData.data}
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

export default Accounts;
