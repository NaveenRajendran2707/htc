import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import FormReceipts from "../../../components/receipts/FormReceipts";

const Receipts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      {/* Header */}
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

      {/* Receipt Information */}
      <section style={{ marginBottom: "20px" }}>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Receipt No:</strong> 00123
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Date:</strong> 2024-12-07
        </p>
      </section>

      {/* Transaction Details */}
      <section style={{ marginBottom: "20px" }}>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Received From:</strong> John Doe
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Amount:</strong> $1,000
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>For Payment of:</strong> Invoice #INV001
        </p>
      </section>

      {/* Payment Summary */}
      <section style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "5px" }}>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Payment Type:</strong> Cheque
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Cheque No:</strong> 123456789
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Bank Name:</strong> ABC Bank
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Cheque Date:</strong> 2024-12-06
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Branch Name:</strong> Main Branch
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Amount Due:</strong> $2,000
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Paid Amount:</strong> $1,000
        </p>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          <strong>Balance Remaining:</strong> $1,000
        </p>
      </section>

      {/* Footer */}
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
          <strong>Prepared By:</strong> Employee Name
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
