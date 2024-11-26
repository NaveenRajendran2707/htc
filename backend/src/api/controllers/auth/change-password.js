import ChangePassword from "../../models/ChangePassword.js";

const schemaName = ChangePassword;
const schemaNameString = "ChangePassword";

export const getChangePasswords = async (req, res) => {
  try {
    const q = req.query && req.query.q;

    let query = schemaName.find(
      q ? { email: { $regex: q, $options: "i" } } : {}
    );

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 25;
    const skip = (page - 1) * pageSize;
    const total = await schemaName.countDocuments(
      q ? { email: { $regex: q, $options: "i" } } : {}
    );

    const pages = Math.ceil(total / pageSize);

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .select("-password")
      .lean();

    const result = await query;

    console.log("result", result);

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

export const postChangePassword = async (req, res) => {
  try {
    const object = await schemaName.create(req.body);
    res.status(200).send(object);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

export const getChangePasswordById = async (req, res) => {
  try {
    const { id } = req.params;
    const objects = await schemaName
      .findById(id)
      .lean()
      .sort({ createdAt: -1 })
      .select("-password");

    if (!objects)
      return res.status(404).json({ error: `${schemaNameString} not found` });
    res.status(200).send(objects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const putChangePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const object = await schemaName.findById(id);

    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` });

    password && (object.password = await object.encryptPassword(password));

    await object.save();

    res.status(200).json({ message: `${schemaNameString} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChangePassword = async (req, res) => {
  try {
    const { id } = req.params;
    await schemaName.findByIdAndDelete(id);
    res.status(200).json({ message: `${schemaNameString} removed` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
