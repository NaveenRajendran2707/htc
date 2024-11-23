import { Search } from "..";

const ViewPermissions = ({
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
  const method = (color, method, permission) => {
    return (
      permission.method === method && (
        <span className={`badge bg-${color} px-2`}>{permission.method}</span>
      )
    );
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h2 className="font-bold text-2xl text-gray-800 my-1">Permissions</h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by email"
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
            <span className="">New Permission</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Name</th>
              <th className="p-2">Method</th>
              <th className="p-2">Route</th>
              <th className="p-2">Auth</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.data.map((permission, index) => (
                <tr key={permission._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{permission.name}</td>
                  <td className="p-2">
                    {method("primary", "GET", permission)}
                    {method("success", "POST", permission)}
                    {method("warning", "PUT", permission)}
                    {method("danger", "DELETE", permission)}
                  </td>
                  <td className="p-2">{permission.route}</td>
                  <td className="p-2">
                    {permission.auth ? (
                      <span className="material-symbols-rounded text-green-600">
                        check_circle
                      </span>
                    ) : (
                      <span className="material-symbols-rounded text-red-600">
                        cancel
                      </span>
                    )}
                  </td>

                  <td className="p-2">
                    <div className="btn-group">
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(permission);
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
                          editHandler(permission);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>
                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(permission._id)}
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

export default ViewPermissions;
