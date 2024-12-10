import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useCompaniesHook from "../../../api/companies";
import useServiceHook from "../../../api/serviceTypes";
import useStatesHook from "../../../api/states";
import useCitiesHook from "../../../api/cities";
import useUsersHook from "../../../api/users";
import useDepartmentsHook from "../../../api/departments";
import useDesignationsHook from "../../../api/designations";
import usePermissionsHook from "../../../api/permissions";
import useMenusHook from "../../../api/menus";
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
import { useNavigate } from "react-router-dom";
import useAuthHook from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";
import useUserRolesHook from "../../../api/userRoles";

const Companies = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
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
  // console.log("users", users);

  const { getDepartments } = useDepartmentsHook({
    limit: 1000000,
  });

  const { data: departmentData } = getDepartments;

  const { getDesignations } = useDesignationsHook({
    limit: 1000000,
  });

  const { data: designationData } = getDesignations;

  const { getPermissions } = usePermissionsHook({
    limit: 1000000,
  });
  const { getMenus } = useMenusHook({
    limit: 1000000,
  });

  const { data: permissionData } = getPermissions;
  const { data: menuData } = getMenus;

  const { postLogin } = useAuthHook();

  const {
    isLoading: isLoad,
    isError: isErr,
    error: err,
    mutateAsync,
    isSuccess,
    data: datas,
  } = postLogin;

  const { postUserRoleById } = useUserRolesHook({
    page: 1,
    q: "",
    limit: 10000000,
  });
  
  const {
    mutateAsync: userRoleMutateAsync,
    data: userRole,
    error: errorUserRole,
    isError: isErrorUserRole,
  } = postUserRoleById;

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
          mobile: data.mobile,
          mobileNumber2: data.mobileNumber2,
          phoneNumber: data.phoneNumber,
          email: data.email,
          logo: data.logo,
          watermark: data.watermark,
          blocked: data.blocked,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          permission: data.permission,
          menu: data.menu,
          department: data.department,
          designation: data.designation,
          pan: data.pan,
          pf: data.pf,
          esi: data.esi,
          dob: data.dob,
          salaryscheduletype: data.salaryscheduletype,
          user: data.user,
        })
      : mutateAsyncPost(data);
    setIsModalOpen(false);
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
    setValue("mobile", company.mobile);
    setValue("mobileNumber2", company.mobileNumber2);
    setValue("phoneNumber", company.phoneNumber);
    setValue("email", company.email);
    setValue("logo", company.logo);
    setValue("watermark", company.watermark);
    setValue("blocked", company.blocked);
    setValue("firstName", company?.user?.firstName);
    setValue("lastName", company?.user?.lastName);
    setValue("permission", company?.user?.permission);
    setValue("menu", company?.user?.menu);
    setValue("department", company?.employee?.department);
    setValue("designation", company?.employee?.designation);
    setValue("pan", company?.employee?.pan);
    setValue("pf", company?.employee?.pf);
    setValue("esi", company?.employee?.esi);
    setValue("dob", company?.employee?.dob);
    setValue("user", company?.employee?.user);
    setValue("salaryscheduletype", company?.employee?.salaryscheduletype);
    setValue("city", company?.employee?.city);
    setValue("state", company?.employee?.state);
  };

  const editHandler = (company) => {
    console.log("company", company);
    setId(company._id);
    setView(false);
    setEdit(true);
    const selectedState = getState?.data?.find(
      (state) => state._id === company?.employee?.state
    );
    // console.log("selectedState",getState)
    const selectedCity = getCity?.data?.find(
      (city) => city._id === company?.employee?.city
    );
    setValue("state", selectedState?.stateName || "");
    setValue("city", selectedCity?.cityName || "");
    setValue("companySerialNo", company.companySerialNo);
    setValue("registrationDate", company.registrationDate);
    setValue("introductionID", company.introductionID);
    // setValue("city", company.city);
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
    setValue("mobile", company.mobile);
    setValue("mobileNumber2", company.mobileNumber2);
    setValue("phoneNumber", company.phoneNumber);
    setValue("email", company.email);
    setValue("logo", company.logo);
    setValue("watermark", company.watermark);
    setValue("blocked", company.blocked);
    setValue("firstName", company?.user?.firstName);
    setValue("lastName", company?.user?.lastName);
    setValue("permission", company?.user?.permission);
    setValue("menu", company?.user?.menu);
    setValue("department", company?.employee?.department);
    setValue("designation", company?.employee?.designation);
    setValue("pan", company?.employee?.pan);
    setValue("pf", company?.employee?.pf);
    setValue("esi", company?.employee?.esi);
    setValue("dob", company?.employee?.dob);
    setValue("user", company?.employee?.user);
    setValue("salaryscheduletype", company?.employee?.salaryscheduletype);
    // setValue("city", company?.employee?.city);
    // setValue("state", company?.employee?.state);
  };
  const clearAuthData = () => {
    setAuth(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userMenu");
  };

  const viewCompanyHandler = async (company) => {
    const email = company?.user?.email;
    // const password = company?.user?.password;
    const password = "123456";
    const userType = company?.user?.userType;
    if (!email || !password || !userType) {
      console.error("Invalid user data");
      return;
    }
    try {
      clearAuthData();
      const payload = { email, password, usertype: userType };
      const data = await postLogin.mutateAsync(payload);
      if (data) {
        const userRole = await userRoleMutateAsync(data._id);
        if (userRole) {
          localStorage.setItem("userRole", JSON.stringify(userRole));
          localStorage.setItem("userInfo", JSON.stringify(data));
          localStorage.setItem("userMenu", JSON.stringify(getMenus));
          setAuth({
            userInfo: data,
            userRole: userRole,
          });
          const newTabUrl = "/";
          window.open(newTabUrl, "_blank");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
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
          viewCompanyHandler={viewCompanyHandler}
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
        <div className="fixed z-[1000] inset-0 flex w-screen justify-center items-center p-2">
          <DialogPanel className="w-full max-w-[800px] max-h-[calc(100vh_-_1rem)] overflow-auto flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">
                {edit ? "Edit Company" : view ? "View Company" : "Add Company"}
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
                departmentData={departmentData && departmentData.data}
                designationData={designationData && designationData.data}
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

export default Companies;
