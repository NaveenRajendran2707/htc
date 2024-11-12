import mongoose from "mongoose";

const CategoryScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    categorySerialNo: { type: String, unique: true },
    categoryName: { type: String },
    discount: { type: String },
    margin: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategoryScheme);
export default Category;
