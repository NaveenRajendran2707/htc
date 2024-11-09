import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import usePermissionsHook from "../../../api/permissions";
import useMenusHook from "../../../api/menus";
import useUsersHook from "../../../api/users";
import useEmployeesHook from "../../../api/employees";
import useCitiesHook from "../../../api/cities";
import useStatesHook from "../../../api/states";
import useDepartmentsHook from "../../../api/departments";
import useDesignationsHook from "../../../api/designations";
import {
  ViewEmployees,
  ViewStates,
  Pagination,
  FormEmployees,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Employees = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getEmployees, postEmployee, updateEmployee, deleteEmployee } = useEmployeesHook({
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

  const { data, isLoading, isError, error, refetch } = getEmployees;
  const { data: permissionData } = getPermissions;
  const { data: menuData } = getMenus;

  console.log("data", data)

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateEmployee;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteEmployee;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postEmployee;

  const { getDepartments } = useDepartmentsHook({
    limit: 1000000,
  });

  const { data: departmentData } = getDepartments;

  const { getDesignations } = useDesignationsHook({
    limit: 1000000,
  });

  const { data: designationData } = getDesignations;


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
    edit
      ? mutateAsyncUpdate({
          _id: id,
          department: data.department,
          designation: data.designation,
          name: data.name,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          city: data.city,
          pincode: data.pincode,
          state: data.state,
          mobile: data.mobile,
          pan: data.pan,
          pf: data.pf,
          esi: data.esi,
          dob: data.dob,
          salaryscheduletype: data.salaryscheduletype,
          email: data.email,
          confirmed: data.confirmed,
          blocked: data.blocked,
          password: data.password,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (employee) => {
    setId(employee._id);
    setView(true);
    setValue("department", employee.department);
    setValue("designation", employee.designation);
    setValue("name", employee.name);
    setValue("address1", employee.address1);
    setValue("address2", employee.address2);
    setValue("address3", employee.address3);
    setValue("city", employee.city);
    setValue("pincode", employee.pincode);
    setValue("state", employee.state);
    setValue("mobile", employee.mobile);
    setValue("pan", employee.pan);
    setValue("pf", employee.pf);
    setValue("esi", employee.esi);
    setValue("dob", employee.dob);
    setValue("salaryscheduletype", employee.salaryscheduletype);
    setValue("email", employee.email);
    setValue("confirmed", employee.confirmed);
    setValue("blocked", employee.blocked);
  };

  const editHandler = (employee) => {
    setId(employee._id);
    setView(false);
    setEdit(true);
    setValue("department", employee.department);
    setValue("designation", employee.designation);
    setValue("name", employee.name);
    setValue("address1", employee.address1);
    setValue("address2", employee.address2);
    setValue("address3", employee.address3);
    setValue("city", employee.city);
    setValue("pincode", employee.pincode);
    setValue("state", employee.state);
    setValue("mobile", employee.mobile);
    setValue("pan", employee.pan);
    setValue("pf", employee.pf);
    setValue("esi", employee.esi);
    setValue("dob", employee.dob);
    setValue("salaryscheduletype", employee.salaryscheduletype);
    setValue("email", employee.email);
    setValue("confirmed", employee.confirmed);
    setValue("blocked", employee.blocked);
  };

  return (
    <>
      <Helmet>
        <title>Employees | HTC</title>
        <meta property="og:title" content="Employees" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">Employee has been deleted successfully.</Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">Employee has been updated successfully.</Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">Employee has been created successfully.</Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewEmployees
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
                {edit ? "Edit Employee" : view ? "View Employee" : "Add Employee"}
              </h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-2"
                aria-label="Close"
                onClick={() => {setIsModalOpen(false); formCleanHandler()}}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
            <div className="flex-1 overflow-auto py-4 px-6">
              <FormEmployees
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
                departmentData={departmentData && departmentData.data}
                designationData={designationData && designationData.data}
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

export default Employees;
