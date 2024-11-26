import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useRolesHook from "../../../api/roles";
import usePermissionsHook from "../../../api/permissions";
import useMenusHook from "../../../api/menus";
import {
  ViewRoles,
  ViewStates,
  Pagination,
  FormRoles,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Roles = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getRoles, postRole, updateRole, deleteRole } = useRolesHook({
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
    defaultValues: {},
  });

  const { data, isLoading, isError, error, refetch } = getRoles;
  const { data: permissionData } = getPermissions;
  const { data: menuData } = getMenus;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateRole;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteRole;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postRole;

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
    console.log("data", data)
    edit
      ? mutateAsyncUpdate({
          _id: id,
          name: data.name,
          description: data.description,
          permission: data.permission,
          menu: data.menu,
        })
      : mutateAsyncPost(data);
      setIsModalOpen(false);
  };

  const viewHandler = (role) => {
    setId(role._id);
    setView(true);
    setValue("name", role.name);
    setValue("description", role.description);
    setValue(
      "permission",
      role.permission && role.permission.map((item) => item._id)
    );
    setValue(
      "menu",
      role.menu && role.menu.map((item) => item._id)
    );
  };

  const editHandler = (role) => {
    setId(role._id);
    setView(false);
    setEdit(true);
    setValue("name", role.name);
    setValue("description", role.description);
    setValue(
      "permission",
      role.permission && role.permission.map((item) => item._id)
    );
    setValue(
      "menu",
      role.menu && role.menu.map((item) => item._id)
    );
  };

  return (
    <>
      <Helmet>
        <title>Roles | HTC</title>
        <meta property="og:title" content="Roles" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">Role has been deleted successfully.</Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">Role has been updated successfully.</Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">Role has been Created successfully.</Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewRoles
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
                {edit ? "Edit Role" : view ? "View Role" : "Add Role"}
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
              <FormRoles
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
                watch={watch}
                error={error}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                permissionData={permissionData && permissionData.data}
                menuData={menuData && menuData.data}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/50" />
      </Dialog>
    </>
  );
};

export default Roles;
