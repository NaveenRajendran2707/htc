import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const companyScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    companySerialNo: { type: String },
    registrationDate: { type: String },
    introductionID: { type: String },
    companyID: { type: String },
    typeofService: { type: String },
    companyType: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
      unique: true,
    },
    companyName: { type: String },
    companyShortName: { type: String },
    gSTINNumber: { type: String },
    companyAdminName: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    // city: { type: String },
    pincode: { type: String },
    mobile: { type: String },
    mobileNumber2: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    logo: { type: String },
    watermark: { type: String },    
    blocked: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// companyScheme.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }

// // encrypt password before saving into mongoDB
// companyScheme.methods.encryptPassword = async function (password) {
//   const salt = await bcrypt.genSalt(10)
//   return await bcrypt.hash(password, salt)
// }

// companyScheme.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     next()
//   }
//   const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })

// companyScheme.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString('hex')

//   this.resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) // Ten Minutes

//   return resetToken
// }

const Company = mongoose.model('Company', companyScheme)
export default Company
