import moment from "moment";
import { Search } from "..";

const ViewEmployees = ({
  data,
  editHandler,
  viewHandler,
  deleteHandler,
  isLoadingDelete,
  setIsModalOpen,
  setQ,
  q,
  searchHandler,
}) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h2 className="font-bold text-2xl text-gray-800 my-1">
          Employees ({data && data.total})
        </h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by email"
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Employee
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 rounded">
          <thead className="text-xs text-slate-500 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2 py-4">Employee ID</th>              
              <th className="px-2 py-4">Department</th>
              <th className="px-2 py-4">Designation</th>
              <th className="px-2 py-4">Name</th>
              <th className="px-2 py-4">Email</th>
              {/* <th className="px-2 py-4">Address 1</th>
            <th className="px-2 py-4">Address 2</th>
            <th className="px-2 py-4">Address 3</th>
            <th className="px-2 py-4">City</th>
            <th className="px-2 py-4">Pin Code</th>
            <th className="px-2 py-4">State</th>
            <th className="px-2 py-4">Mobile</th>
            <th className="px-2 py-4">PAN No.</th>
            <th className="px-2 py-4">PF No.</th>
            <th className="px-2 py-4">ESI No.</th>
            <th className="px-2 py-4">DOB</th>
            <th className="px-2 py-4">Salary Schedule Type</th>             */}
            <th className="px-2 py-4">Joined Date</th>
              <th className="px-2 py-4">Confirmed</th>
              <th className="px-2 py-4">Blocked</th>
              {/* <th className="px-2 py-4">Permission</th> */}
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((employee) => (
                <tr key={employee._id}>
                  <td className="p-2">{employee.employeeID}</td>
                  <td className="p-2">{employee.department.department}</td>
                  <td className="p-2">{employee.designation.designation}</td>
                  <td className="p-2">{employee.user.firstName + " " + employee.user.lastName}</td>
                  <td className="p-2">
                    <a href={`mailto:${employee.user.email}`}>{employee.user.email}</a>
                  </td>
                  {/* <td className="p-2">{employee.address1}</td>
                <td className="p-2">{employee.address2}</td>
                <td className="p-2">{employee.address3}</td>
                <td className="p-2">{employee.city}</td>
                <td className="p-2">{employee.pincode}</td>
                <td className="p-2">{employee.state}</td>
                <td className="p-2">{employee.mobile}</td>
                <td className="p-2">{employee.pan}</td>
                <td className="p-2">{employee.pf}</td>
                <td className="p-2">{employee.esi}</td>
                <td className="p-2">{employee.dob}</td>
                <td className="p-2">{employee.salaryscheduletype}</td> */}
                  <td className="p-2">
                    {moment(employee.createdAt).format("lll")}
                  </td>
                  <td className="p-2">
                    {employee.confirmed ? (
                      <span className="material-symbols-rounded text-green-600">
                        check_circle
                      </span>
                    ) : (
                      <span className="material-symbols-rounded text-red-600">
                        check_circle
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    {employee.blocked ? (
                      <span className="material-symbols-rounded text-red-600">
                        block
                      </span>
                    ) : (
                      <span className="material-symbols-rounded text-gray-400">
                        block
                      </span>
                    )}
                  </td>
                  
                  {/* <td className="p-2">
                    <div className="flex gap-2">
                      <button
                          className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                          onClick={() => {
                            setIsModalOpen(true);
                            editHandler(employee);
                          }}
                        >                        
                          <span className="material-symbols-rounded ">shield_person</span>
                        </button>
                    </div>
                  </td> */}

                  <td className="p-2">
                    <div className="flex gap-2">

                    <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(employee);
                        }}
                      >
                        <span className="material-symbols-rounded ">visibility</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onMouseOver={() => {
                                                      
                        }}
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(employee);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>                        
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(employee._id)}
                        disabled={isLoadingDelete}
                      >
                        {isLoadingDelete ? (
                          <span
                            className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full dark:text-white"
                            role="status"
                            aria-label="loading"
                          >
                            <span className="sr-only">Loading...</span>
                          </span>
                        ) : (
                          <span className="material-symbols-rounded">
                            delete
                          </span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewEmployees;
