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
            className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm px-3 py-1 text-center"
            onClick={() => {
              setIsModalOpen(true);
              setView(false);
            }}
          >
            <span className="material-symbols-rounded">add</span>
            <span className="">New Item</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-800 rounded">
          <thead className="text-xs text-slate-800 bg-slate-200 shadow-sm border-y border-slate-300">
            <tr>
              <th className="p-2">SI.NO</th>
              <th className="p-2">Item Code</th>
              <th className="p-2">Branch Name</th>
              <th className="p-2">Group Name</th>
              <th className="p-2">Product Category</th>
              <th className="p-2">Name</th>
              <th className="p-2">Alias Name</th>
              <th className="p-2">UOM</th>
              <th className="p-2">Cost</th>
              <th className="p-2">List Price</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Margin Price</th>
              <th className="p-2">MRP</th>
              <th className="p-2">Batch No</th>
              <th className="p-2">Expiry Date</th>
              <th className="p-2">Free Gift Qty</th>
              <th className="p-2">HSN Code</th>
              <th className="p-2">GST Tax Rate</th>
              <th className="p-2">ReOrder Qty</th>
              <th className="p-2">Opening Stock Qty</th>
              <th className="p-2">Opening Stock Value</th>
              <th className="p-2">Product Image</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
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
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
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
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(item);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded-full text-sm p-2"
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
