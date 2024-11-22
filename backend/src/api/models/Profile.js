import mongoose from 'mongoose'

const profileScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number },
    // adminUserID: { type: String, required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    blocked: { type: String }
  },
  { timestamps: true }
  
)

const Profile = mongoose.model('Profile', profileScheme)
export default Profile
