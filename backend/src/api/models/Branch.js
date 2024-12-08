import crypto from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const branchScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    branchSerialNo: { type: String },
    registrationDate: { type: String },
    companyID: { type: String },
    branchID: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    branchName: { type: String },
    branchShortName: { type: String },
    gSTINNumber: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    mobileNumber: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    logo: { type: String },
    watermark: { type: String },
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// branchScheme.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

// // encrypt password before saving into mongoDB
// branchScheme.methods.encryptPassword = async function (password) {
//   const salt = await bcrypt.genSalt(10)
//   return await bcrypt.hash(password, salt)
// }

// branchScheme.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next()
//   }
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

// branchScheme.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString('hex')

//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) // Ten Minutes

//   return resetToken
// }

const Branch = mongoose.model("Branch", branchScheme);
export default Branch;
