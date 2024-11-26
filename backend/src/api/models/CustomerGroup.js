import mongoose from 'mongoose'

const CustomerGroupScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    customerGroupSerialNo: { type: String, required: true },
    customerGroup: { type: String, required: true },
    customerSubGroup: { type: String, required: true },    
  },
  { timestamps: true }
)

const CustomerGroup = mongoose.model('CustomerGroup', CustomerGroupScheme)
export default CustomerGroup
