import moment from "moment";
import { Search } from "..";

const ViewCompany = ({
  data,
  viewHandler,
  editHandler,
  deleteHandler,
  isLoadingDelete,
  setIsModalOpen,
  setQ,
  q,
  searchHandler,
  viewCompanyHandler,
}) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h2 className="font-bold text-2xl text-gray-800 my-1">Companies</h2>
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
            <span className="">New Company</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Company Code</th>
              <th className="p-2">Joined Date</th>
              <th className="p-2">Introduction ID</th>
              <th className="p-2">Company ID</th>
              <th className="p-2">Company Name</th>
              <th className="p-2">Address 1</th>
              <th className="p-2">Address 2</th>
              <th className="p-2">Address 3</th>
              <th className="p-2">City</th>
              <th className="p-2">State</th>
              <th className="p-2">Mobile No.</th>
              <th className="p-2">Email</th>
              <th className="p-2">Service Type</th>
              <th className="p-2">Status</th>
              <th className="p-2" style={{ width: "145px" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((company, index) => (
                <tr key={company._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{company.companySerialNo}</td>
                  <td className="p-2">
                    {moment(company.createdAt).format("lll")}
                  </td>
                  <td className="p-2">{company.introductionID}</td>
                  <td className="p-2">{company.companyID}</td>
                  <td className="p-2">{company.companyName}</td>
                  <td className="p-2">{company.address1}</td>
                  <td className="p-2">{company.address2}</td>
                  <td className="p-2">{company.address3}</td>
                  <td className="p-2">{company.city}</td>
                  <td className="p-2">{company.state}</td>
                  <td className="p-2">{company.mobile}</td>
                  <td className="p-2">{company.email}</td>
                  <td className="p-2">{company.typeofService}</td>
                  {/* <td className="p-2">
                    {company.confirmed ? (
                      <span className="material-symbols-rounded text-green-600">
                        check_circle
                      </span>
                    ) : (
                      <span className="material-symbols-rounded text-red-600">
                        check_circle
                      </span>
                    )}
                  </td> */}
                  <td className="p-2">
                    {company.blocked ? (
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
                          viewHandler(company);
                        }}
                      >
                        <span className="material-symbols-rounded ">
                          visibility
                        </span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(company);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          viewCompanyHandler(company);
                        }}
                      >
                        <span className="material-symbols-rounded ">
                          source_environment
                        </span>
                      </button>
                      {/* <button onClick={()=>{viewCompanyHandler(company)}}>
                        <img
                          src="https://cdn-icons-png.freepik.com/256/3328/3328224.png?ga=GA1.1.42440995.1721449048&semt=ais_hybrid"
                          alt="Company Icon"
                          style={{ width: '24px', height: '24px' }}
                        />
                      </button> */}

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(company._id)}
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

export default ViewCompany;
