import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import {
  inputHidden,
  inputCheckBox,
  inputSwitch,
  inputText,
  inputDate,
  InputAutoCompleteSelect,
  dynaimcInputSelectField,
  inputNumber,
} from "../../../utils/dynamicForm";
import useCustomersHook from "../../../api/customers";
import useItemsHook from "../../../api/items";
const ReceiptVoucher = () => {
  const [isAccountOpen, setIsAccountSOpen] = useState(false);
  const [isBB,setIsBB]=useState(false)
  const [bbIndex,setBBIndex]=useState(null)
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [summaryDetails,setSummaryDetails]=useState([])
  const [totalSummary,setTotalSummary]=useState({
    taxableAmount:0,
    cgst:0,
    sgst:0,
    igst:0
  })
  
  const [count,setCount]=useState(0)
  const { getItems, postItem, updateItem, deleteItem } = useItemsHook({
    page,
    q,
  });
  const { getCustomers } = useCustomersHook({
    page,
    q,
  });
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [
        {
          accountName: "",
          amountType: "",
          quantity: 0,
          unit: 0,
          price: 0,
          discount: "",
          total: 0,
          amount: 0,
          description: "",
          taxAmount:0
        },
      ],
      modeOfPayment: "Cash/Bank Account",
      receiptNo: 1,
      invoiceDate: "",
      narration: "",
      grandTotal:0,
      cashType:'UPI',
      refNo:'',
      chequeNo:'',
      chequeDate:'',
      bankName:'',
    },
  });
  const watchedFields = watch(); 
  const totalAmount = watch("totalAmount");
  const grandTotal = watch("grandTotal");
  const customRound = (num) => {
    const decimalPart = num % 1; // Get the decimal part of the number
    if (decimalPart >= 0.5) {
      return Math.ceil(num); // Round up
    }
    return Math.floor(num); // Round down
  };
  const createSummaryReport=()=>{
    const isTamilState=watchedFields.state?.toLowerCase()=='tamilnadu'
   const summaryData= watchedFields.products.filter(x=>x.hsnCode).reduce((acc, x) => {
      let existingEntry = acc.find(item => item.gstRate == x.gstRate);
    
      if (!existingEntry) {
        existingEntry = {
          gstRate: x.gstRate,
          taxableAmount: 0,
          cgst: 0,
          sgst: 0,
          igst: 0,
        };
        acc.push(existingEntry);
      }
      console.log('state ', watchedFields.state)
      const csgst=isTamilState?x.taxAmount * 0.5:0;
      const igst=isTamilState?0:x.taxAmount
      existingEntry.taxableAmount += x.taxAmount;
      existingEntry.cgst +=  csgst;
      existingEntry.sgst += csgst;
      existingEntry.igst +=  igst;
    
      return acc;
    }, []);
    console.log(summaryData)
    setSummaryDetails(summaryData)
    const totalSummary= summaryData.reduce((acc,x)=>{
      return acc+x.taxableAmount
  },0)
  setTotalSummary({
    taxableAmount:totalSummary,
    cgst:isTamilState?totalSummary/2:0,
    sgst:isTamilState?totalSummary/2:0,
    igst:isTamilState?0:totalSummary
  })
    
  }
  const { data: cusData } = getCustomers;
  const { data, isLoading, isError, error, refetch } = getItems;
  const [customerDropdownData, setCustomerDropdownData] = useState([]);
  useEffect(() => {
    setCustomerDropdownData(
      cusData?.data.map((x) => {
        return {
          _id: x._id,
          name: x.customerName,
        };
      })
    );
  }, [cusData]);
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
  };
  const handleSelectItem = (item, index) => {
    setIsAccountSOpen(true)
  };
  function CreateEachProductAmount(product,index){
    console.log(product)
    const quantity=parseInt(product.quantity?product.quantity:0)
    const unit =parseFloat(product.unit?product.unit:0)
    const price=quantity*unit
    const discount=parseFloat(product.discount?product.discount:0)/100
    const discountAmount=parseFloat(price*discount).toFixed(2)
    const priceWithDiscount=parseFloat((price-discountAmount).toFixed(2))
    const tax=((product.gstRate?product.gstRate:0)/100).toFixed(2)
    console.log(priceWithDiscount)
    console.log(priceWithDiscount*tax)
    console.log(1+tax)
    const taxAmount = watchedFields.saleType=='Exclude Tax'? priceWithDiscount * tax:(parseFloat(priceWithDiscount*parseFloat(tax)))/(parseFloat(1+parseFloat(tax)));
    console.log(watchedFields.saleType)
    const amount=watchedFields.saleType=='Exclude Tax'?priceWithDiscount+taxAmount:priceWithDiscount
    
    setValue(`products.${index}.taxAmount`, parseFloat(taxAmount.toFixed(2)))
    setValue(`products.${index}.price`, price);
    setValue(`products.${index}.amount`, amount);
  }
  
  useEffect(()=>{
    
    if (watchedFields.products && watchedFields.products.length>0 && watchedFields.products[0].hsnCode!=''){
      watchedFields.products.forEach((e,index)=>{
        CreateEachProductAmount(e,index)
      })
      const totalAmount=watchedFields.products.reduce((acc,x)=>{
        return acc+parseFloat(x.amount)
      },0.00).toFixed(2)
      setValue(`totalAmount`, totalAmount);
      const roundOffValue=customRound(totalAmount)
      setValue('roundOff',roundOffValue)
      setValue('grandTotal',roundOffValue+parseInt(watchedFields.packingCharge))
      createSummaryReport()
    }
  },[count])
  
  
  const handleCustomerSelectItem = (e) => {
    const selectedCustomerDetails = cusData?.data?.filter(
      (x) => x.customerName == e
    );
    if (selectedCustomerDetails.length > 0) {
      setValue(`gstNoPOS`, selectedCustomerDetails[0].GSTINNo);
      setValue(
        `customerAddressPOS`,
        `${selectedCustomerDetails[0].address1} , ${selectedCustomerDetails[0].address2} , ${selectedCustomerDetails[0].address3}`
      );
      setValue(`customerContactPOS`, selectedCustomerDetails[0].mobileNumber);
      setValue(`state`,selectedCustomerDetails[0].state)
      console.log(selectedCustomerDetails[0].state)
    } else {
      setValue(`gstNoPOS`, "");
      setValue(`customerAddressPOS`, "");
      setValue(`customerContactPOS`, "");
      setValue(`state`,'')
    }
    setCount(count+1)
  };
  return (
    <div className="flex flex-col max-w-[1660px] min-h-[calc(100vh_-_theme(spacing.6))] mx-auto">
        <h1 className="text-2xl font-bold mb-4">Receipts</h1>
    <div className="min-h-screen bg-white shadow-lg rounded-lg border p-4">
      <div className="grid grid-cols-12 gap-x-4 mb-6">
        <div className="col-span-6 grid grid-cols-12 gap-x-4">
          
          {inputText({
            wrapperClass: "!m-0",
            register,
            errors,
            label: "Mode of Payment",
            isRequired: false,
            name: 'modeOfPayment',
            placeholder: "Mode of Payment",
            readOnly: true,
            wrapperClass: "col-span-4",
          })}
          <button
              type="button"
              onClick={togglePOS}
              className="min-w-[120px] col-span-4 text-blue-600 border border-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm p-1 h-8 text-center "
            >
              Print Balance
            </button>
          {inputText({
            wrapperClass: "!m-0",
            register,
            errors,
            label: "Receipt No",
            isRequired: false,
            name: `receiptNo`,
            placeholder: "Receipt Number",
            readOnly: true,
            wrapperClass: "col-span-4",
          })}
          {inputDate({
            register,
            errors,
            label: "Invoice Date",
            name: "invoiceDate",
            placeholder: "Invoice Date",
            readOnly: false,
            wrapperClass: "col-span-4",
          })}
        </div>
        
      </div>

      <Dialog
        open={isAccountOpen}
        onClose={() => {
          setIsAccountSOpen(false);
        }}
        transition
        className="realtive z-[1000] transition duration-100 ease-linear data-[closed]:opacity-0"
      >
        <div className="fixed z-[1000] inset-0 flex w-screen justify-center items-center p-2">
          <DialogPanel className="w-full max-w-[800px] max-h-[calc(100vh_-_1rem)] overflow-auto flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">Bank Details</h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-1"
                aria-label="Close"
                onClick={() => {
                  setIsAccountSOpen(false);
                }}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
            <div className="bg-gray-50 p-4 rounded border mb-6">
              <div className="grid grid-cols-2 gap-x-4">
              <div>
                    {dynaimcInputSelectField({
                                register,
                                errors,
                                label: "E -Payment",
                                name: "cashType",
                                value: "name",
                                placeholder: "Cash Type",
                                isRequired: false,
                                data: [
                                  {
                                    name: "UPI",
                                    shortName: "upi",
                                    _id: "UPI",
                                  },
                                  {
                                    name: "NEFT",
                                    shortName: "neft",
                                    _id: "NEFT",
                                  },
                                  {
                                    name: "CHEQUE",
                                    shortName: "cheque",
                                    _id: "CHEQUE",
                                  },
                                ],
                                readOnly: false,
                                wrapperClass: "col-span-4",
                                onChange:(e)=>{
                                  setValue('cashType',e)
                                  setCount(count+1)
                                }
                              })}
                </div>
                <div>
                {inputText({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    isRequired: false,
                    name: `refNo`,
                    placeholder: "Reference No .",
                    label: "Reference No .",
                  })}
                </div>
                
                <div>
                {inputText({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    isRequired: false,
                    name: `chequeNo`,
                    placeholder: "Cheque No .",
                    label: "Cheque No .",
                  })}
                </div>
                <div>
                {inputDate({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    isRequired: false,
                    name: `chequeDate`,
                    label: "Cheque Date .",
                  })}
                </div>
                <div>
                {inputText({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    isRequired: false,
                    name: `bankName`,
                    placeholder: "Bank Name",
                    label: "bankName",
                  })}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/50" />
      </Dialog>
      
      {/* Product Table */}
      <h3 className="text-base font-bold text-gray-800 mb-2">Products</h3>

      <div className="relative overflow-x-auto rounded-lg border border-slate-300">
        <table className="w-full text-sm text-left text-gray-800 ">
          
          <tbody>
            {fields.map((item, index) => (
              <tr
                key={item.id}
                className="border-b last:border-0 hover:bg-slate-100"
              >
                <td className="border-b  border-gray-300 p-1 text-center">
                  {index + 1}
                </td>
                <td className="border-b  border-l border-gray-300 p-1">
                  

                  {InputAutoCompleteSelect({
                    register,
                    errors,
                    isRequired: false,
                    id: "itemListOption",
                    data: customerDropdownData,
                    onChange: (e) => {
                      handleSelectItem(e, index);
                    },
                    name: `products.${index}.accountName`,
                    placeholder: "Account Name",
                    readOnly: false,
                    wrapperClass: "!m-0",
                  })}
                </td>
                <td className="border-b  border-l border-gray-300 p-1">
                  {inputText({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    isRequired: false,
                    name: `products.${index}.amount Type`,
                    placeholder: "Amount *",
                    readOnly: true,
                  })}
                </td>
                <td className="border-b  border-l border-gray-300 p-1">
                  {inputNumber({
                    wrapperClass: "!m-0",

                    register,
                    wrapperClass: "!m-0",
                    errors,
                    onChange: (e) => {
                       setCount(count+1)
                    },
                    name: `products.${index}.amount`,
                    placeholder: "Amount",
                    readOnly: false,
                  })}
                </td>
               
                
                <td className="border-b  border-l border-gray-300 p-1">
                  {inputText({
                    wrapperClass: "!m-0",

                    register,
                    errors,
                    name: `products.${index}.discount`,
                    onChange: (e) => {
                      
                    },
                    placeholder: "Discount",
                    isRequired:false,
                    readOnly: true,
                  })}
                </td>
                <td className="border-b  border-l border-gray-300 p-1">
                  {inputNumber({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    name: `products.${index}.total`,
                    placeholder:'Total',
                    readOnly: true,
                  })}
                </td>
                
                
                <td className="border-b  border-l border-gray-300 p-1 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBB(true)
                      setBBIndex(index)
                    }}
                    className="bg-white border border-blue-600 text-blue-600 px-2 py-1 rounded"
                  >
                    BB
                  </button>
                </td>
                <td className="border-b  border-l border-gray-300 p-1 text-center">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index)
                        setCount(count+1)
                      }}
                      className="text-red-500 border border-transparent hover:bg-white hover:border-red-600 px-1 py-1 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 -960 960 960"
                        width="20"
                        fill="currentColor"
                      >
                        <path d="M292.31-140q-29.92 0-51.12-21.19Q220-182.39 220-212.31V-720h-40v-60h180v-35.38h240V-780h180v60h-40v507.69Q740-182 719-161q-21 21-51.31 21H292.31ZM680-720H280v507.69q0 5.39 3.46 8.85t8.85 3.46h375.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46V-720ZM376.16-280h59.99v-360h-59.99v360Zm147.69 0h59.99v-360h-59.99v360ZM280-720v520-520Z" />
                      </svg>
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
        onClick={() =>{
          append({});
          setCount(count+1)
        } }
        className="bg-green-600 text-white px-3 py-1 rounded mt-2 mb-5"
      >
        Add Account
      </button>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-6 relative overflow-x-auto rounded-lg border border-slate-300">
          <table className="w-full text-sm text-left text-gray-800 ">
            
            <tbody>
              
              <tr className="border-b last:border-0 hover:bg-slate-100">
                <td className="p-2">
                  <strong>Narration</strong>
                </td>
                <td className="p-2 border-l border-gray-300" colSpan="4">
                  {inputText({
                    wrapperClass: "!m-0",
                    register,
                    errors,
                    name: "narration",
                    placeholder: "Narration",
                    readOnly: false,
                    isRequired: false,
                  })}
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div className="col-span-6 ">
          <div className="col-span-6 relative overflow-x-auto rounded-lg border border-slate-300">
            <table className="w-full text-sm text-left text-gray-800 ">
              <tr>
                <td className="p-2">
                  {inputNumber({
                    wrapperClass: "!m-0",
                    label:'Grand Total',
                    register,
                    errors,
                    placeholder: "GrandTotal",
                    name: `grandTotal`,
                    readOnly: true,
                  })}
                </td>
              </tr>
              
            </table>
          </div>
        </div>
      </div>
      <Dialog
        open={isBB}
        onClose={() => {
          setIsBB(false);
        }}
        transition
        className="realtive z-[1000] transition duration-100 ease-linear data-[closed]:opacity-0"
      >
        <div className="fixed z-[1000] inset-0 flex w-screen justify-center items-center p-2">
          <DialogPanel className="w-full max-w-[800px] max-h-[calc(100vh_-_1rem)] overflow-auto flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center p-3"
              as="div"
            >
              <h3 className="text-2xl font-bold">Due Details</h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-1"
                aria-label="Close"
                onClick={() => {
                  setIsBB(false);
                }}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
             <table className="w-full text-sm text-left text-gray-800 ">
                        <thead className="text-xs text-slate-800 bg-slate-100 border-b-2 border-slate-300">
                          <tr>
                            <th className="px-2 py-3">Date</th>
                            <th className="px-2 py-3 border-l border-gray-300">
                              Invoice No
                            </th>
                            <th className="px-2 py-3 border-l border-gray-300">Invoice Amount</th>
                            <th className="px-2 py-3 border-l border-gray-300">Due Days</th>
                            <th className="px-2 py-3 border-l border-gray-300">Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          
                        </tbody>
                      </table>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/50" />
      </Dialog>
      
      <div className="flex gap-x-3 mt-6">
        <button
          type="submit"
          className="min-w-[120px] inline-flex items-center justify-center gap-1 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white font-medium rounded text-sm p-1 h-8 text-center "
          onClick={handleSubmit(submitHandler)}
        >
          Save
        </button>
        <button
          type="button"
          className="px-3 py-0 h-8 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-300 bg-white text-gray-800 hover:bg-gray-100  hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-white active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
          onClick={() => reset()}
        >
          Clear
        </button>
      </div>
    </div>
    </div>
  );
};

export default ReceiptVoucher;
