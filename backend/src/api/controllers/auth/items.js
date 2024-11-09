import Items from "../../models/Items.js";

const schemaName = Items;
const schemaNameString = "Items";

export const getItems = async (req, res) => {
  try {
    const q = req.query && req.query.q;

    let query = schemaName.find(
      q ? { name: { $regex: q, $options: "i" } } : {}
    );

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * pageSize;
    const total = await schemaName.countDocuments(
      q ? { name: { $regex: q, $options: "i" } } : {}
    );

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize).sort({ createdAt: -1 }).lean();

    const result = await query;
    const getLastItem = await schemaName
      .find({})
      .sort({ sequenceNumber: -1 })
      .limit(1);
    const nextSequenceNumber =
      getLastItem && getLastItem.length > 0
        ? getLastItem[0].sequenceNumber + 1
        : "";

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      nextSequenceNumber,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postItem = async (req, res) => {
  try {
    const object = await schemaName.create(req.body);
    res.status(200).send(object);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemSerialNo,
      branchName,
      groupName,
      productCategory,
      name,
      aliasName,
      uom,
      cost,
      listPrice,
      discount,
      marginPrice,
      MRP,
      batchNo,
      expiryDate,
      freeGiftQty,
      HSNCode,
      GSTTaxRate,
      reOrderQty,
      openingStockQty,
      openingStockValue,
      productImage,
      blocked,
    } = req.body;

    const object = await schemaName.findById(id);
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` });

    object.itemSerialNo = itemSerialNo;
    object.branchName = branchName;
    object.groupName = groupName;
    object.productCategory = productCategory;
    object.name = name;
    object.aliasName = aliasName;
    object.uom = uom;
    object.cost = cost;
    object.listPrice = listPrice;
    object.discount = discount;
    object.marginPrice = marginPrice;
    object.MRP = MRP;
    object.batchNo = batchNo;
    object.expiryDate = expiryDate;
    object.freeGiftQty = freeGiftQty;
    object.HSNCode = HSNCode;
    object.GSTTaxRate = GSTTaxRate;
    object.reOrderQty = reOrderQty;
    object.openingStockQty = openingStockQty;
    object.openingStockValue = openingStockValue;
    object.productImage = productImage;
    object.blocked = blocked;

    await object.save();
    res.status(200).json({ message: `${schemaNameString} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    // const object = await schemaName.findById(id)
    // if (!object)
    //   return res.status(400).json({ error: `${schemaNameString} not found` })

    // const rolesObject = await Role.find({
    //   menu: object._id,
    // })

    // if (rolesObject.length > 0) {
    //   rolesObject.forEach(async (role) => {
    //     role.menu.filter((item) => item.toString() !== id).length
    //     await role.save()
    //   })
    // }

    await schemaName.findByIdAndDelete(id);
    //await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
