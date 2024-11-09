import mongoose from "mongoose";

const ItemGroupScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    itemGroupSerialNo: { type: String },
    itemGroup: { type: String },
    itemSubGroup: { type: String },
  },
  { timestamps: true }
);

const ItemGroup = mongoose.model("ItemGroup", ItemGroupScheme);
export default ItemGroup;
