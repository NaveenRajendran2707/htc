import moment from "moment";
import { Search } from "..";

const ViewCustomers = ({
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
          Customers
        </h2>
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
            <span className="">New Customer</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Customer Code</th>
              <th className="p-2">Customer Group</th>
              <th className="p-2">Customer Name</th>
              <th className="p-2">Name</th>
              <th className="p-2">Address 1</th>
              <th className="p-2">Address 2</th>
              <th className="p-2">Address 3</th>
              <th className="p-2">City</th>
              <th className="p-2">Pin code</th>
              <th className="p-2">State</th>
              <th className="p-2">Mobile Number</th>
              <th className="p-2">Email ID</th>
              <th className="p-2">GSTIN Number</th>
              <th className="p-2">Pan Number</th>
              <th className="p-2">Transport Name</th>
              <th className="p-2">Opening Balance</th>
              <th className="p-2">Password</th>
              <th className="p-2">Blocked</th>
              <th className="p-2" style={{width:'145px'}}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((customer, index) => (
                <tr key={customer._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{customer.customerSerialNo}</td>
                  <td className="p-2">{customer.customerGroup}</td>
                  <td className="p-2">{customer.customerName}</td>
                  <td className="p-2">{customer.user?.firstName + " " + customer.user?.lastName}</td>
                  <td className="p-2">{customer.address1}</td>
                  <td className="p-2">{customer.address2}</td>
                  <td className="p-2">{customer.address3}</td>
                  <td className="p-2">{customer.city}</td>
                  <td className="p-2">{customer.state}</td>
                  <td className="p-2">{customer.pincode}</td>
                  <td className="p-2">{customer.mobileNumber}</td>
                  <td className="p-2">{customer.user?.email}</td>
                  <td className="p-2">{customer.GSTINNo}</td>
                  <td className="p-2">{customer.panNo}</td>
                  <td className="p-2">{customer.transportName}</td>
                  <td className="p-2">{customer.openingBalance}</td>
                  <td className="p-2">{customer.password}</td>
                  <td className="p-2">
                    {customer.blocked ? (
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
                    <div className="flex flex-wrap">
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(customer);
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
                          editHandler(customer);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(customer._id)}
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

export default ViewCustomers;
