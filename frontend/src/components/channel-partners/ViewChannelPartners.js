import moment from "moment";
import { Search } from "..";

const ViewChannelPartners = ({
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
          Channel Partners
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
            <span className="">New Channel Partner</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Channel Partner Code</th>
              <th className="p-2">Registration Date</th>
              <th className="p-2">State</th>
              <th className="p-2">City</th>
              <th className="p-2">Introduction ID</th>
              <th className="p-2">Channel Partner ID</th>
              <th className="p-2">User Name</th>
              <th className="p-2">Name</th>
              <th className="p-2">Address 1</th>
              <th className="p-2">Address 2</th>
              <th className="p-2">Address 3</th>
              <th className="p-2">Pin code</th>
              <th className="p-2">Mobile Number</th>
              <th className="p-2">Phone Number</th>
              <th className="p-2">Email ID</th>
              <th className="p-2">Pan Number</th>
              <th className="p-2">Plan Type</th>
              <th className="p-2">Bank Account Number</th>
              <th className="p-2">IFSC Code</th>
              <th className="p-2">Profile Picture</th>
              <th className="p-2">Blocked</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((channelpartner, index) => (
                <tr key={channelpartner._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{channelpartner.channelPartnerSerialNo}</td>
                  <td className="p-2">{channelpartner.registrationDate}</td>
                  <td className="p-2">{channelpartner.state}</td>
                  <td className="p-2">{channelpartner.city}</td>
                  <td className="p-2">{channelpartner.introductionID}</td>
                  <td className="p-2">{channelpartner.channelPartnerID}</td>
                  <td className="p-2">{channelpartner.userName}</td>
                  <td className="p-2">{channelpartner.user?.firstName + " " + channelpartner.user?.lastName}</td>
                  <td className="p-2">{channelpartner.address1}</td>
                  <td className="p-2">{channelpartner.address2}</td>
                  <td className="p-2">{channelpartner.address3}</td>
                  <td className="p-2">{channelpartner.pincode}</td>
                  <td className="p-2">{channelpartner.mobileNumber}</td>
                  <td className="p-2">{channelpartner.phoneNumber}</td>
                  <td className="p-2">{channelpartner.user?.email}</td>
                  <td className="p-2">{channelpartner.panNumber}</td>
                  <td className="p-2">{channelpartner.planType}</td>
                  <td className="p-2">{channelpartner.bankAccountNumber}</td>
                  <td className="p-2">{channelpartner.IFSCCode}</td>
                  <td className="p-2">{channelpartner.profilePicture}</td>
                  <td className="p-2">
                    {channelpartner.blocked ? (
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
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(channelpartner);
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
                          editHandler(channelpartner);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(channelpartner._id)}
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

export default ViewChannelPartners;
