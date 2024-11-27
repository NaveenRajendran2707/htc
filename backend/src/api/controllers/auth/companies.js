import Company from '../../models/Company.js'
import Employee from '../../models/Employee.js'
import User from '../../models/User.js'

const schemaName = Company
const schemaNameString = 'Company'

export const getCompanies = async (req, res) => {
  try {
    const q = req.query && req.query.q

    let query = schemaName.find(
      q ? { email: { $regex: q, $options: 'i' } } : {}
    )

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      q ? { email: { $regex: q, $options: 'i' } } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .select('-password')
      .lean()
      .populate('employee')
      .populate('user')

    const result = await query

    const getLastItem = await schemaName.find({}).sort({sequenceNumber: -1}).limit(1)
    const nextSequenceNumber = getLastItem && getLastItem.length > 0 ? getLastItem[0].sequenceNumber + 1 : ''

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      nextSequenceNumber,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const postCompany = async (req, res) => {
  try {
    const userObject = await User.create(req.body)
    req.body.user = userObject._id
    const employeeObject = await Employee.create(req.body)
    req.body.employee = employeeObject._id
    const object = await schemaName.create(req.body)

    // await Profile.create({
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

    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params
    const objects = await schemaName
      .findById(id)
      .lean()
      .sort({ createdAt: -1 })
      .select('-password')

    if (!objects)
      return res.status(404).json({ error: `${schemaNameString} not found` })
    res.status(200).send(objects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putCompany = async (req, res) => {
  try {
    const { id } = req.params
    const { companySerialNo, registrationDate, introductionID, companyID, typeofService, companyType, user, 
      companyName, companyShortName, gSTINNumber, companyAdminName, address1, address2, address3, pincode, mobile, 
      mobileNumber2, phoneNumber, email, logo, watermark, blocked, menu, permission , password,pan,
      pf,
      esi,
      dob,
      salaryscheduletype,
      department,
      designation,} = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    const object1 = await Employee.findById(object.employee._id);
    if (!object1) {
      return res.status(400).json({ error: `${schemaNameString} not found` });
    }

    const object2 = await User.findById(object.user._id);
    if (!object2) {
      return res.status(400).json({ error: `User not found` });
    }

    object.companySerialNo = companySerialNo
    object.registrationDate = registrationDate
    object.introductionID = introductionID
    // object.city = city
    object.companyID = companyID
    object.typeofService = typeofService
    object.companyType = companyType
    object.user = user
    object.companyName = companyName
    object.companyShortName = companyShortName
    object.gSTINNumber = gSTINNumber
    object.companyAdminName = companyAdminName
    object.address1 = address1
    object.address2 = address2
    object.address3 = address3
    object.pincode = pincode
    object.mobile = mobile
    object.mobileNumber2 = mobileNumber2
    object.phoneNumber = phoneNumber
    object.email = email
    object.logo = logo
    object.watermark = watermark
    object.blocked = blocked

    object1.pan = pan
    object1.pf = pf
    object1.esi = esi
    object1.dob = dob
    object1.salaryscheduletype = salaryscheduletype
    object2.department = department
    object2.designation = designation

    object2.menu = menu && menu.length > 0 ? menu : object2.menu;
    object2.permission = permission && permission.length > 0 ? permission : object2.permission;

    password && (object.password = await object.encryptPassword(password))

    // if (name) {
    //   await Profile.findOneAndUpdate({ user: id }, { name })
    // }

    await object.save()
    await object2.save();

    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCompany = async (req, res) => {
  try {

    const { id } = req.params
    const object = await schemaName.findByIdAndDelete(id)

    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    // await Profile.findOneAndDelete({
    //   user: object._id,
    // })

    // const userRole = await UserRole.findOne({ user: object._id })
    // userRole && (await userRole.remove())
    
    // await object.remove()
    
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
