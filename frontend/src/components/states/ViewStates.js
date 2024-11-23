import { Search } from "..";

const ViewStates = ({
  data,
  editHandler,
  viewHandler,
  deleteHandler,
  isLoadingDelete,
  setQ,
  q,
  searchHandler,
  setIsModalOpen,
  setView,
}) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h2 className="font-bold text-2xl text-gray-800 my-1">States</h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by name"
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
          <button
            className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-1 text-center"
            onClick={() => {
              setIsModalOpen(true);
              setView(false);
            }}
          >
            <span className="material-symbols-rounded">add</span>
            <span className="">New State</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">State Code</th>
              <th className="p-2">State Name</th>
              <th className="p-2">State Short Name</th>
              <th className="p-2">State GST Code</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((state, index) => (
                <tr key={state._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{state.stateID}</td>
                  <td className="p-2">{state.stateName}</td>
                  <td className="p-2">{state.stateShortName}</td>
                  <td className="p-2">{state.stateGSTCode}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(state);
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
                          editHandler(state);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(state._id)}
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

export default ViewStates;
