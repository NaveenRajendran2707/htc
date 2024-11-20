import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { inputText, inputSelect, inputDate } from "../../utils/dynamicForm";

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

  const calculateAmount = (product) => {
    const price = parseFloat(product.price || 0);
    const quantity = parseFloat(product.quantity || 0);
    const discount = parseFloat(product.discount || 0);
    const gstRate = parseFloat(product.gstRate || 0);
    const discountedPrice = price - (price * discount) / 100;
    const taxableAmount = discountedPrice * quantity;
    const gstAmount = (taxableAmount * gstRate) / 100;
    return taxableAmount + gstAmount;
  };

  const submitHandler = (data) => {
    console.log("Form Data:", data);
    alert("Sales Voucher Submitted Successfully");
    reset();
  };

  const togglePOS = () => {
    setIsPOSOpen(!isPOSOpen);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {inputSelect({
        register,
        errors,
        label: "Sale Type",
        name: "saleType",
        options: [
          { label: "Cash Sale", value: "Cash Sale" },
          { label: "Credit Sale", value: "Credit Sale" },
        ],
        onChange: (e) => setSaleType(e.target.value),
      })}

      {inputText({
        register,
        errors,
        label: "Invoice No",
        name: "invoiceNo",
        placeholder: "Invoice No",
      })}
      {inputDate({
        register,
        errors,
        label: "Invoice Date",
        name: "invoiceDate",
        placeholder: "11/11/1999",
      })}
      <button
        type="button"
        onClick={togglePOS}
        className="min-w-[120px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
      >
        {isPOSOpen ? "Close P.O.S" : "Open P.O.S"}
      </button>
      {isPOSOpen && (
        <>
          <h3 className="font-bold">P.O.S</h3>
          {inputText({
            register,
            errors,
            label: "Customer Name",
            name: "customerNamePOS",
            placeholder: "Customer Name",
          })}
          {inputText({
            register,
            errors,
            label: "GST No",
            name: "gstNoPOS",
            placeholder: "GST No",
          })}
          {inputText({
            register,
            errors,
            label: "Address",
            name: "customerAddressPOS",
            placeholder: "Address",
          })}
        </>
      )}
      {fields.map((item, index) => (
        <div key={item.id} className="mb-4 border p-2">
          <div className="grid grid-cols-1 gap-4">
            {inputText({
              register,
              errors,
              name: `products.${index}.productName`,
              label: "Product Name",
              placeholder: "Product Name",
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.hsnCode`,
              label: "HSN Code",
              placeholder: "HSN Code",
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.quantity`,
              label: "Quantity",
              placeholder: "Quantity",
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.unit`,
              label: "Unit",
              placeholder: "Unit",
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.price`,
              label: "Price",
              placeholder: "Price",
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.discount`,
              label: "Discount %",
              placeholder: "Discount %",
            })}
            {inputSelect({
              register,
              errors,
              name: `products.${index}.gstRate`,
              label: "GST Rate %",
              options: [
                { label: "5%", value: "5" },
                { label: "12%", value: "12" },
                { label: "18%", value: "18" },
                { label: "28%", value: "28" },
              ],
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.amount`,
              label: "Amount",
              placeholder: "Amount",
              isReadOnly: true,
            })}
            {inputText({
              register,
              errors,
              name: `products.${index}.description`,
              label: "Description",
              type: "textarea",
              placeholder: "Description",
            })}
          </div>
          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 mt-2"
            >
              Remove Product
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({})}
        className="text-blue-600 mb-4"
      >
        Add Product
      </button>
      {inputText({
        register,
        errors,
        name: "taxableAmount",
        label: "Taxable Amount",
        placeholder: "Taxable Amount",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "cgst",
        label: "CGST",
        placeholder: "CGST",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "sgst",
        label: "SGST",
        placeholder: "SGST",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "igst",
        label: "IGST",
        placeholder: "IGST",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "packingCharge",
        label: "Packing Charge",
        placeholder: "packingCharge",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "roundOff",
        label: "Round Off",
        placeholder: "roundOff",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "totalAmount",
        label: "Total Amount",
        placeholder: "totalAmount",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        name: "grandTotal",
        label: "Grand Total",
        placeholder: "grandTotal",
        isReadOnly: true,
      })}
      {inputText({
        register,
        errors,
        label: "Narration",
        name: "narration",
        placeholder: "Narration",
        type: "textarea",
      })}
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="min-w-[120px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default FormSalesVoucher;
