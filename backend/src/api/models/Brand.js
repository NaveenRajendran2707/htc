import mongoose from "mongoose";

const BrandScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    brandSerialNo: { type: String },
    brandName: { type: String },
    discount: { type: String },
    margin: { type: String },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", BrandScheme);
export default Brand;
