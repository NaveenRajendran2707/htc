import moment from "moment";
import { Search } from "..";

const ViewAccounts = ({
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
          Accounts
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
            Add New Account
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 rounded">
          <thead className="text-xs text-slate-500 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2 py-4">SI.NO</th>
              <th className="px-2 py-4">Account Code</th>
              <th className="px-2 py-4">Account Group</th>
              <th className="px-2 py-4">Account Name</th>
              <th className="px-2 py-4">Alias Name</th>
              <th className="px-2 py-4">Address 1</th>
              <th className="px-2 py-4">Address 2</th>
              <th className="px-2 py-4">Address 3</th>
              <th className="px-2 py-4">City</th>
              <th className="px-2 py-4">Pin code</th>
              <th className="px-2 py-4">State</th>
              <th className="px-2 py-4">Mobile Number</th>
              <th className="px-2 py-4">Email ID</th>
              <th className="px-2 py-4">GSTIN Number</th>
              <th className="px-2 py-4">Pan Number</th>
              <th className="px-2 py-4">Transport Name</th>
              <th className="px-2 py-4">Opening Balance</th>
              <th className="px-2 py-4">Password</th>
              <th className="px-2 py-4">Blocked</th>
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((account, index) => (
                <tr key={account._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{account.accountSerialNo}</td>
                  <td className="p-2">{account.accountGroup}</td>
                  <td className="p-2">{account.accountName}</td>
                  <td className="p-2">{account.aliasName}</td>
                  <td className="p-2">{account.address1}</td>
                  <td className="p-2">{account.address2}</td>
                  <td className="p-2">{account.address3}</td>
                  <td className="p-2">{account.city}</td>
                  <td className="p-2">{account.state}</td>
                  <td className="p-2">{account.pincode}</td>
                  <td className="p-2">{account.mobileNumber}</td>
                  <td className="p-2">{account.emailID}</td>
                  <td className="p-2">{account.GSTINNo}</td>
                  <td className="p-2">{account.panNo}</td>
                  <td className="p-2">{account.transportName}</td>
                  <td className="p-2">{account.openingBalance}</td>
                  <td className="p-2">{account.password}</td>
                  <td className="p-2">
                    {account.blocked ? (
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
                    <div className="flex gap-2">
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(account);
                        }}
                      >
                        <span className="material-symbols-rounded ">
                          visibility
                        </span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onMouseOver={() => {}}
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(account);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(account._id)}
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

export default ViewAccounts;
