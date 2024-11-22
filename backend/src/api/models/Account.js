import mongoose from "mongoose";

const AccountScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    accountSerialNo: { type: String, required: true, unique: true },
    accountGroup: { type: String, required: true },
    accountName: { type: String },
    aliasName: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String },
    mobileNumber: { type: String },
    emailID: { type: String },
    GSTINNo: { type: String },
    panNo: { type: String },
    transportName: { type: String },
    openingBalance: { type: String },
    password: { type: String },
    blocked: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", AccountScheme);
export default Account;
