import { Search } from "..";

const ViewItems = ({
  data,
  viewHandler,
  editHandler,
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
        <h2 className="font-bold text-2xl text-gray-800 my-1">Items</h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by name"
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            onClick={() => {
              setIsModalOpen(true);
              setView(false);
            }}
          >
            Add New Item
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 rounded">
          <thead className="text-xs text-slate-500 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2 py-4">SI.NO</th>
              <th className="px-2 py-4">Item Code</th>
              <th className="px-2 py-4">Branch Name</th>
              <th className="px-2 py-4">Group Name</th>
              <th className="px-2 py-4">Product Category</th>
              <th className="px-2 py-4">Name</th>
              <th className="px-2 py-4">Alias Name</th>
              <th className="px-2 py-4">UOM</th>
              <th className="px-2 py-4">Cost</th>
              <th className="px-2 py-4">List Price</th>
              <th className="px-2 py-4">Discount</th>
              <th className="px-2 py-4">Margin Price</th>
              <th className="px-2 py-4">MRP</th>
              <th className="px-2 py-4">Batch No</th>
              <th className="px-2 py-4">Expiry Date</th>
              <th className="px-2 py-4">Free Gift Qty</th>
              <th className="px-2 py-4">HSN Code</th>
              <th className="px-2 py-4">GST Tax Rate</th>
              <th className="px-2 py-4">ReOrder Qty</th>
              <th className="px-2 py-4">Opening Stock Qty</th>
              <th className="px-2 py-4">Opening Stock Value</th>
              <th className="px-2 py-4">Product Image</th>
              <th className="px-2 py-4">Status</th>
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.map((item, index) => (
                <tr key={item._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.itemSerialNo}</td>
                  <td className="p-2">{item.branchName}</td>
                  <td className="p-2">{item.groupName}</td>
                  <td className="p-2">{item.productCategory}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.aliasName}</td>
                  <td className="p-2">{item.uom}</td>
                  <td className="p-2">{item.cost}</td>
                  <td className="p-2">{item.listPrice}</td>
                  <td className="p-2">{item.discount}</td>
                  <td className="p-2">{item.marginPrice}</td>
                  <td className="p-2">{item.MRP}</td>
                  <td className="p-2">{item.batchNo}</td>
                  <td className="p-2">{item.expiryDate}</td>
                  <td className="p-2">{item.freeGiftQty}</td>
                  <td className="p-2">{item.HSNCode}</td>
                  <td className="p-2">{item.GSTTaxRate}</td>
                  <td className="p-2">{item.reOrderQty}</td>
                  <td className="p-2">{item.openingStockQty}</td>
                  <td className="p-2">{item.openingStockValue}</td>
                  <td className="p-2">{item.productImage}</td>
                  {/* <td className="p-2">{item.blocked}</td> */}
                  <td className="p-2">
                    {item.blocked ? (
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
                          viewHandler(item);
                        }}
                      >
                        <span className="material-symbols-rounded ">
                          visibility
                        </span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(item);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(item._id)}
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

export default ViewItems;
