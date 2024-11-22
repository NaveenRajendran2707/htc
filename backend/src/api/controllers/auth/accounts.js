import Account from "../../models/Account.js";
import User from "../../models/User.js";
import UserRole from "../../models/UserRole.js";

const schemaName = Account;
const schemaNameString = "Account";   

export const getAccounts = async (req, res) => {
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
      .select('-password')
      .lean()
      .populate('user')
      // .populate('user', ['firstName','lastName','email'])
      // .populate('state', ['stateName'])
      // .populate('city', ['cityName'])

    const result = await query;

    console.log("result", result);

    const getLastItem = await User.find({})
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

export const postAccount = async (req, res) => {
  try {
    const userObject = await User.create(req.body);
    req.body.user = userObject._id;
    // const employeeObject = await schemaName.create(req.body);
    // await User.create({
    //   user: object._id,
    //   department: object.department,
    //   designation: object.designation,
    //   name: object.name,
    //   address1: object.address1,
    //   address2: object.address2,
    //   address3: object.address3,
    //   city: object.city,
    //   pincode: object.pincode,
    //   state: object.state,
    //   mobile: object.mobile,
    //   pan: object.pan,
    //   pf: object.pf,
    //   esi: object.esi,
    //   dob: object.dob,
    //   salaryscheduletype: object.salaryscheduletype,
    //   image: `https://avatars.githubusercontent.com/u/3984336?v=4`,
    // })
    // res.status(200).send(userObject);
    const object = await schemaName.create(req.body);
    res.status(200).send(object);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountById = async (req, res) => {
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

export const putAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      accountSerialNo,
      accountGroup,
      accountName,
      aliasName,
      address1,
      address2,
      address3,
      city,
      state,
      pincode,
      mobileNumber,
      emailID,
      GSTINNo,
      panNo,
      transportName,
      openingBalance,
      password,
      blocked,
      menu,
      permission
    } = req.body;

    const object = await schemaName.findById(id);
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` });

    const object1 = await User.findById(object.user._id);
    if (!object1) {
      return res.status(400).json({ error: `User not found` });
    }

    object.accountSerialNo = accountSerialNo;
    object.accountGroup = accountGroup;
    object.accountName = accountName;
    object.aliasName = aliasName;
    object.address1 = address1;
    object.address2 = address2;
    object.address3 = address3;
    object.city = city;
    object.state = state;
    object.pincode = pincode;
    object.mobileNumber = mobileNumber;
    object.emailID = emailID;
    object.GSTINNo = GSTINNo;
    object.panNo = panNo;
    object.transportName = transportName;
    object.openingBalance = openingBalance;
    object.blocked = blocked;

    object1.menu = menu && menu.length > 0 ? menu : object1.menu;
    object1.permission = permission && permission.length > 0 ? permission : object1.permission;

    password && (object.password = await object.encryptPassword(password));

    // if (name) {
    //   await Profile.findOneAndUpdate({ user: id }, { name });
    // }

    await object.save();
    await object1.save();

    res.status(200).json({ message: `${schemaNameString} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const object = await schemaName.findByIdAndDelete(id);

    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` });

    await Profile.findOneAndDelete({
      user: object._id,
    });

    const userRole = await UserRole.findOne({ user: object._id });
    userRole && (await userRole.remove());

    //await object.remove()

    res.status(200).json({ message: `${schemaNameString} removed` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
