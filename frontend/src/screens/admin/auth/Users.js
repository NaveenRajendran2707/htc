import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import usePermissionsHook from "../../../api/permissions";
import useMenusHook from "../../../api/menus";
import useUsersHook from "../../../api/users";
import useCitiesHook from "../../../api/cities";
import useStatesHook from "../../../api/states";
import {
  ViewUsers,
  Pagination,
  FormUsers,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Users = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getUsers, postUser, updateUser, deleteUser } = useUsersHook({
    page,
    q,
  });

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

  const { data, isLoading, isError, error, refetch } = getUsers;
  const { data: permissionData } = getPermissions;
  const { data: menuData } = getMenus;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateUser;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteUser;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postUser;

  const { getStates } = useStatesHook({
    limit: 1000000,
  });

  const { data: stateData } = getStates;

  const { getCities } = useCitiesHook({
    limit: 1000000,
  });

  const { data: cityData } = getCities;

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
    console.log("edit", edit);
    console.log("adminnnnn", data);

    edit
      ? mutateAsyncUpdate({
          _id: id,
          sequenceNumber: data.sequenceNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          city: data.city,
          pincode: data.pincode,
          state: data.state,
          mobile: data.mobile,
          pan: data.pan,
          email: data.email,
          confirmed: data.confirmed,
          blocked: data.blocked,
          password: data.password,
          permission: data.permission,
          menu: data.menu,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (user) => {
    console.log("viewHandler", user);
    setId(user._id);
    setView(true);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("address1", user.profile?.address1);
    setValue("address2", user.profile?.address2);
    setValue("address3", user.profile?.address3);
    setValue("city", user.profile?.city);
    setValue("pincode", user.profile?.pincode);
    setValue("state", user.profile?.state);
    setValue("mobile", user.profile?.mobile);
    setValue("pan", user.profile?.pan);    
    setValue("email", user.email);
    setValue("confirmed", user.confirmed);
    setValue("blocked", user.blocked);
    setValue("permission", user.permission);
    setValue("menu", user.menu);
  };

  const editHandler = (user) => {
    console.log("editHandler", user);
    setId(user._id);
    setView(false);
    setEdit(true);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("address1", user.profile?.address1);
    setValue("address2", user.profile?.address2);
    setValue("address3", user.profile?.address3);
    setValue("city", user.profile?.city);
    setValue("pincode", user.profile?.pincode);
    setValue("state", user.profile?.state);
    setValue("mobile", user.profile?.mobile);
    setValue("pan", user.profile?.pan);    
    setValue("email", user.email);
    setValue("confirmed", user.confirmed);
    setValue("blocked", user.blocked);
    setValue("permission", user.permission);
    setValue("menu", user.menu);
  };

  return (
    <>
      <Helmet>
        <title>Users | HTC</title>
        <meta property="og:title" content="Users" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">User has been deleted successfully.</Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">User has been updated successfully.</Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">User has been created successfully.</Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewUsers
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
          state={getStates}
          city={getCities}
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
                {edit ? "Edit User" : view ? "View User" : "Add User"}
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
              <FormUsers
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
                stateData={stateData && stateData.data}
                cityData={cityData && cityData.data}
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

export default Users;
