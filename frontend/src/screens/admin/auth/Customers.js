import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useCustomersHook from "../../../api/customers";
import usePermissionsHook from "../../../api/permissions";
import useMenusHook from "../../../api/menus";
import useStatesHook from "../../../api/states";
import useCitiesHook from "../../../api/cities";
import useUsersHook from "../../../api/users";
import useCustomerGroupsHook from "../../../api/customerGroups";
import {
  ViewCustomers,
  ViewStates,
  Pagination,
  FormCustomers,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Customers = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getCustomers, postCustomer, updateCustomer, deleteCustomer } =
    useCustomersHook({
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

  const { getCustomerGroups } = useCustomerGroupsHook({
    page,
    q,
  });

  const { data: customer } = getCustomerGroups;

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

  const { data, isLoading, isError, error, refetch } = getCustomers;
  const { data: permissionData } = getPermissions;
  const { data: menuData } = getMenus;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateCustomer;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteCustomer;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postCustomer;

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
          customerSerialNo: data.customerSerialNo,
          customerGroup: data.customerGroup,
          customerName: data.customerName,
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
      setIsModalOpen(false);
  };

  const viewHandler = (customer) => {
    setId(customer._id);
    setView(true);
    setValue("customerSerialNo", customer.customerSerialNo);
    setValue("customerGroup", customer.customerGroup);
    setValue("customerName", customer.customerName);
    setValue("aliasName", customer.aliasName);
    setValue("address1", customer.address1);
    setValue("address2", customer.address2);
    setValue("address3", customer.address3);
    setValue("state", customer.state);
    setValue("firstName", customer.user?.firstName);
    setValue("lastName", customer.user?.lastName);
    setValue("city", customer.city);
    setValue("pincode", customer.pincode);
    setValue("mobileNumber", customer.mobileNumber);
    setValue("email", customer.user?.email);
    setValue("GSTINNo", customer.GSTINNo);
    setValue("panNo", customer.panNo);
    setValue("transportName", customer.transportName);
    setValue("openingBalance", customer.openingBalance);
    setValue("password", customer.password);
    setValue("blocked", customer.blocked);
    setValue("permission", customer.user?.permission);
    setValue("menu", customer.user?.menu);
  };

  const editHandler = (customer) => {
    setId(customer._id);
    setView(false);
    setEdit(true);
    setValue("customerSerialNo", customer.customerSerialNo);
    setValue("customerGroup", customer.customerGroup);
    setValue("customerName", customer.customerName);
    setValue("aliasName", customer.aliasName);
    setValue("firstName", customer.user?.firstName);
    setValue("lastName", customer.user?.lastName);
    setValue("address1", customer.address1);
    setValue("address2", customer.address2);
    setValue("address3", customer.address3);
    setValue("state", customer.state);
    setValue("city", customer.city);
    setValue("pincode", customer.pincode);
    setValue("mobileNumber", customer.mobileNumber);
    setValue("email", customer.user?.email);
    setValue("GSTINNo", customer.GSTINNo);
    setValue("panNo", customer.panNo);
    setValue("transportName", customer.transportName);
    setValue("openingBalance", customer.openingBalance);
    setValue("password", customer.password);
    setValue("blocked", customer.blocked);
    setValue("permission", customer.user?.permission);
    setValue("menu", customer.user?.menu);
  };

  return (
    <>
      <Helmet>
        <title>Customers | HTC</title>
        <meta property="og:title" content="Customers" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          Customer has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          Customer has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          Customer has been created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewCustomers
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
          <DialogPanel className="w-full max-w-[800px] max-h-[calc(100vh_-_1rem)] overflow-auto flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit ? "Edit Customer" : view ? "View Customer" : "Add Customer"}
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
              <FormCustomers
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
                customers={customer && customer.data}
                permissionData={permissionData && permissionData.data}
                menuData={menuData && menuData.data}
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

export default Customers;
