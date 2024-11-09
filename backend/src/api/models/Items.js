import mongoose from "mongoose";

const ItemsScheme = mongoose.Schema(
  {
    sequenceNumber: { type: Number, unique: true },
    itemSerialNo: { type: String },
    branchName: { type: String },
    groupName: { type: String, required: true },
    productCategory: { type: String },
    name: { type: String, required: true },
    aliasName: { type: String },
    uom: { type: String, required: true },
    cost: { type: String },
    listPrice: { type: String },
    discount: { type: String },
    marginPrice: { type: String },
    MRP: { type: String },
    batchNo: { type: String },
    expiryDate: { type: String },
    freeGiftQty: { type: String },
    HSNCode: { type: String, required: true },
    GSTTaxRate: { type: String, required: true },
    reOrderQty: { type: String },
    openingStockQty: { type: String },
    openingStockValue: { type: String },
    productImage: { type: String },
    blocked: { type: String },
  },
  { timestamps: true }
);

const Items = mongoose.model("Items", ItemsScheme);
export default Items;
