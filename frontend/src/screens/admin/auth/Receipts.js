import React from "react";

const Receipts = () => {
  const receiptData = {
    receiptNo: "00123",
    date: "2024-12-07",
    receivedFrom: "John Doe",
    amount: "$1,000",
    paymentFor: "Invoice #INV001",
    paymentType: "Cheque",
    chequeNo: "123456789",
    bankName: "ABC Bank",
    chequeDate: "2024-12-06",
    branchName: "Main Branch",
    amountDue: "$2,000",
    paidAmount: "$1,000",
    balance: "$1,000",
    preparedBy: "Jane Smith",
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", color: "#333" }}>
          Payment Receipt
        </h1>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
          XYZ Company
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
          123 Business Street, City, Country
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
          Phone: +1234567890
        </p>
      </header>
      <section style={{ marginBottom: "20px" }}>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Receipt No:</strong> {receiptData.receiptNo}
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Date:</strong> {receiptData.date}
        </p>
      </section>
      <section style={{ marginBottom: "20px" }}>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Received From:</strong> {receiptData.receivedFrom}
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Amount:</strong> {receiptData.amount}
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>For Payment of:</strong> {receiptData.paymentFor}
        </p>
      </section>
      <section
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Payment Type:</strong> {receiptData.paymentType}
        </p>
        {receiptData.paymentType === "Cheque" && (
          <>
            <p style={{ margin: "5px 0", fontSize: "14px" }}>
              <strong>Cheque No:</strong> {receiptData.chequeNo}
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px" }}>
              <strong>Bank Name:</strong> {receiptData.bankName}
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px" }}>
              <strong>Cheque Date:</strong> {receiptData.chequeDate}
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px" }}>
              <strong>Branch Name:</strong> {receiptData.branchName}
            </p>
          </>
        )}
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Amount Due:</strong> {receiptData.amountDue}
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Paid Amount:</strong> {receiptData.paidAmount}
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Balance Remaining:</strong> {receiptData.balance}
        </p>
      </section>
      <footer
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "12px",
          color: "#555",
          borderTop: "2px solid #ddd",
          paddingTop: "10px",
        }}
      >
        <p style={{ margin: "5px 0" }}>
          <strong>Prepared By:</strong> {receiptData.preparedBy}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Authorized Sign:</strong> __________________
        </p>
        <p style={{ margin: "5px 0" }}>Thank you for your business!</p>
      </footer>
    </div>
  );
};

export default Receipts;

//dynamic data format
// import React, { useState } from "react";

// const Receipt = () => {
//   const [formData, setFormData] = useState({
//     receiptNo: "",
//     date: "",
//     receivedFrom: "",
//     amount: "",
//     paymentFor: "",
//     paymentType: "Cash",
//     chequeNo: "",
//     bankName: "",
//     chequeDate: "",
//     branchName: "",
//     amountDue: "",
//     paidAmount: "",
//     balance: "",
//     preparedBy: "",
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Receipt Data Submitted");
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "600px",
//         margin: "20px auto",
//         padding: "20px",
//         border: "1px solid #ddd",
//         borderRadius: "5px",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       <h1 style={{ textAlign: "center" }}>Receipt Entry Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Receipt No:
//           <input
//             type="text"
//             name="receiptNo"
//             value={formData.receiptNo}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Date:
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Received From:
//           <input
//             type="text"
//             name="receivedFrom"
//             value={formData.receivedFrom}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Amount:
//           <input
//             type="text"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           For Payment of:
//           <input
//             type="text"
//             name="paymentFor"
//             value={formData.paymentFor}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Payment Type:
//           <select
//             name="paymentType"
//             value={formData.paymentType}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           >
//             <option value="Cash">Cash</option>
//             <option value="Cheque">Cheque</option>
//           </select>
//         </label>
//         {formData.paymentType === "Cheque" && (
//           <>
//             <label style={{ display: "block", marginBottom: "10px" }}>
//               Cheque No:
//               <input
//                 type="text"
//                 name="chequeNo"
//                 value={formData.chequeNo}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//               />
//             </label>
//             <label style={{ display: "block", marginBottom: "10px" }}>
//               Bank Name:
//               <input
//                 type="text"
//                 name="bankName"
//                 value={formData.bankName}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//               />
//             </label>
//             <label style={{ display: "block", marginBottom: "10px" }}>
//               Cheque Date:
//               <input
//                 type="date"
//                 name="chequeDate"
//                 value={formData.chequeDate}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//               />
//             </label>
//             <label style={{ display: "block", marginBottom: "10px" }}>
//               Branch Name:
//               <input
//                 type="text"
//                 name="branchName"
//                 value={formData.branchName}
//                 onChange={handleInputChange}
//                 style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//               />
//             </label>
//           </>
//         )}
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Amount Due:
//           <input
//             type="text"
//             name="amountDue"
//             value={formData.amountDue}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Paid Amount:
//           <input
//             type="text"
//             name="paidAmount"
//             value={formData.paidAmount}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Balance Remaining:
//           <input
//             type="text"
//             name="balance"
//             value={formData.balance}
//             onChange={handleInputChange}
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               backgroundColor: "#f0f0f0",
//             }}
//             readOnly
//           />
//         </label>
//         <label style={{ display: "block", marginBottom: "10px" }}>
//           Prepared By:
//           <input
//             type="text"
//             name="preparedBy"
//             value={formData.preparedBy}
//             onChange={handleInputChange}
//             style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//           />
//         </label>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             marginTop: "20px",
//           }}
//         >
//           Generate Receipt
//         </button>
//       </form>

//       <hr />
//       <h2 style={{ textAlign: "center" }}>Generated Receipt</h2>
//       <div
//         style={{
//           padding: "20px",
//           border: "1px solid #ddd",
//           borderRadius: "5px",
//           backgroundColor: "#fff",
//         }}
//       >
//         <header style={{ textAlign: "center" }}>
//           <h3>Payment Receipt</h3>
//           <p>XYZ Company</p>
//           <p>123 Business Street, City, Country</p>
//           <p>Phone: +1234567890</p>
//         </header>

//         <section>
//           <p>
//             <strong>Receipt No:</strong> {formData.receiptNo}
//           </p>
//           <p>
//             <strong>Date:</strong> {formData.date}
//           </p>
//         </section>

//         <section>
//           <p>
//             <strong>Received From:</strong> {formData.receivedFrom}
//           </p>
//           <p>
//             <strong>Amount:</strong> {formData.amount}
//           </p>
//           <p>
//             <strong>For Payment of:</strong> {formData.paymentFor}
//           </p>
//         </section>

//         <section>
//           <p>
//             <strong>Payment Type:</strong> {formData.paymentType}
//           </p>
//           {formData.paymentType === "Cheque" && (
//             <>
//               <p>
//                 <strong>Cheque No:</strong> {formData.chequeNo}
//               </p>
//               <p>
//                 <strong>Bank Name:</strong> {formData.bankName}
//               </p>
//               <p>
//                 <strong>Cheque Date:</strong> {formData.chequeDate}
//               </p>
//               <p>
//                 <strong>Branch Name:</strong> {formData.branchName}
//               </p>
//             </>
//           )}
//           <p>
//             <strong>Amount Due:</strong> {formData.amountDue}
//           </p>
//           <p>
//             <strong>Paid Amount:</strong> {formData.paidAmount}
//           </p>
//           <p>
//             <strong>Balance Remaining:</strong> {formData.balance}
//           </p>
//         </section>

//         <footer style={{ textAlign: "center" }}>
//           <p>
//             <strong>Prepared By:</strong> {formData.preparedBy}
//           </p>
//           <p>
//             <strong>Authorized Sign:</strong> __________________
//           </p>
//         </footer>
//       </div>
//     </div>
//   );
// };
// export default Receipt;

