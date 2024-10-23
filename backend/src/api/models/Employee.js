import mongoose from 'mongoose'

const employeeScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    employeeID: { type: String, required: true},
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Designation',
    },    
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
    pincode: { type: String },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
    },    
    mobile: { type: String },
    pan: { type: String },
    pf: { type: String },
    esi: { type: String },
    dob: { type: String },
    salaryscheduletype: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Employee = mongoose.model('Employee', employeeScheme)
export default Employee
