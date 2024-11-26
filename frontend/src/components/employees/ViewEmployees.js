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
        <h2 className="font-bold text-2xl text-gray-800 my-1">Employees</h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by email"
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
          <button
            className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-1 text-center"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-rounded">add</span>
            <span className="">New Employee</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Employee Code</th>
              <th className="p-2">Department</th>
              <th className="p-2">Designation</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              {/* <th className="p-2">Address 1</th>
            <th className="p-2">Address 2</th>
            <th className="p-2">Address 3</th>
            <th className="p-2">City</th>
            <th className="p-2">Pin Code</th>
            <th className="p-2">State</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">PAN No.</th>
            <th className="p-2">PF No.</th>
            <th className="p-2">ESI No.</th>
            <th className="p-2">DOB</th>
            <th className="p-2">Salary Schedule Type</th>             */}
              <th className="p-2">Joined Date</th>
              <th className="p-2">Confirmed</th>
              <th className="p-2">Blocked</th>
              {/* <th className="p-2">Permission</th> */}
              <th className="p-2" style={{width:'145px'}}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((employee, index) => (
                <tr key={employee._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{employee.employeeID}</td>
                  <td className="p-2">{employee.department.department}</td>
                  <td className="p-2">{employee.designation.designation}</td>
                  <td className="p-2">{employee.user?.firstName + " " + employee.user?.lastName}</td>
                  {/* <td className="p-2">
                    {employee.firstName + " " + employee.lastName}
                  </td> */}
                  <td className="p-2">
                    <a href={`mailto:${employee.user?.email}`}>
                      {employee.user?.email}
                    </a>
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
                    <div className="flex flex-wrap">
                      <button
                          className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
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
                    <div className="flex flex-wrap">
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(employee);
                        }}
                      >
                        <span className="material-symbols-rounded ">
                          visibility
                        </span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onMouseOver={() => {}}
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(employee);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
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
