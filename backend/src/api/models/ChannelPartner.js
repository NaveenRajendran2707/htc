import mongoose from "mongoose";

const ChannelPartnerScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    channelPartnerSerialNo: { type: String },
    registrationDate: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    introductionID: { type: String, required: true },
    channelPartnerID: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String },
    address1: { type: String },
    address2: { type: String },
    address3: { type: String },
    pincode: { type: String },
    mobileNumber: { type: String, required: true },
    phoneNumber: { type: String },
    emailID: { type: String },
    panNumber: { type: String },
    planType: { type: String },
    bankAccountNumber: { type: String },
    IFSCCode: { type: String },
    profilePicture: { type: String },
    blocked: { type: String },
  },
  { timestamps: true }
);

const ChannelPartner = mongoose.model("ChannelPartner", ChannelPartnerScheme);
export default ChannelPartner;
