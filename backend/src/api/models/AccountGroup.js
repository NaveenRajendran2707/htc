import mongoose from 'mongoose'

const AccountGroupScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    accountGroupSerialNo: { type: String, required: true },
    accountGroup: { type: String, required: true },
    accountSubGroup: { type: String, required: true },    
  },
  { timestamps: true }
)

const AccountGroup = mongoose.model('AccountGroup', AccountGroupScheme)
export default AccountGroup
