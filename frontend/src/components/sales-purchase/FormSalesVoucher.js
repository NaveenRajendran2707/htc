import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const FormSalesVoucher = () => {
  const [isPOSOpen, setIsPOSOpen] = useState(false);
  const [saleType, setSaleType] = useState("Cash Sale");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [
        {
          productName: "",
          hsnCode: "",
          quantity: "",
          unit: "",
          price: "",
          discount: "",
          gstRate: "",
          amount: "",
          description: "",
        },
      ],
      gstRate: "",
      packingCharge: "",
      roundOff: "",
      totalAmount: "",
      grandTotal: "",
      customerName: "",
      customerAddress: "",
      gstNo: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const submitHandler = (data) => {
    console.log("Form Data:", data);
    alert("Sales Voucher Submitted Successfully");
    reset();
  };

  const togglePOS = () => {
    setIsPOSOpen(!isPOSOpen);
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-4 mb-6">
          Sales Voucher
        </h2>

        {/* Sale Type and Invoice Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-600 mb-2">Sale Type</label>
            <select
              {...register("saleType")}
              className="w-full p-2 border rounded"
              onChange={(e) => setSaleType(e.target.value)}
            >
              <option value="Cash Sale">Cash Sale</option>
              <option value="Credit Sale">Credit Sale</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Invoice No</label>
            <input
              type="text"
              {...register("invoiceNo")}
              placeholder="Invoice No"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Invoice Date</label>
            <input
              type="date"
              {...register("invoiceDate")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* P.O.S Section */}
        <button
          type="button"
          onClick={togglePOS}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          {isPOSOpen ? "Close P.O.S" : "Open P.O.S"}
        </button>
        {isPOSOpen && (
          <div className="bg-gray-50 p-4 rounded border mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              P.O.S Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-2">Customer Name</label>
                <input
                  type="text"
                  {...register("customerNamePOS")}
                  placeholder="Customer Name"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">GST No</label>
                <input
                  type="text"
                  {...register("gstNoPOS")}
                  placeholder="GST No"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Address</label>
                <input
                  type="text"
                  {...register("customerAddressPOS")}
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Contact Number</label>
                <input
                  type="text"
                  {...register("customerContactPOS")}
                  placeholder="Contact Number"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        )}

        {/* Product Table */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Products</h3>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Product Name</th>
                <th className="border border-gray-300 px-4 py-2">HSN Code</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Unit</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Discount %</th>
                <th className="border border-gray-300 px-4 py-2">GST Rate %</th>
                <th className="border border-gray-300 px-4 py-2">Amount</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`products.${index}.productName`)}
                      placeholder="Product Name"
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`products.${index}.hsnCode`)}
                      placeholder="HSN Code"
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`products.${index}.quantity`)}
                      placeholder="Quantity"
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`products.${index}.unit`)}
                      placeholder="Unit"
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`products.${index}.price`)}
                      placeholder="Price"
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      {...register(`products.${index}.discount`)}
                      placeholder="Discount %"
                      className="w-full p-2 border rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      {...register(`products.${index}.gstRate`)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      {...register(`products.${index}.amount`)}
                      placeholder="Amount"
                      className="w-full p-2 border rounded"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={() => append({})}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Add Product
        </button>

        {/* Summary Section */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
          Summary
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-2">Total Amount</label>
            <input
              type="text"
              {...register("totalAmount")}
              placeholder="Total Amount"
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Grand Total</label>
            <input
              type="text"
              {...register("grandTotal")}
              placeholder="Grand Total"
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
            onClick={handleSubmit(submitHandler)}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded"
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSalesVoucher;
