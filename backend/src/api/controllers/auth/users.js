import User from '../../models/User.js'
import Profile from '../../models/Profile.js'
import UserRole from '../../models/UserRole.js'
import Employee from '../../models/Employee.js'

const schemaName = User
const schemaNameString = 'User'

export const getUsers = async (req, res) => {
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
      .populate('profile')

    console.log("result", query)

    const result = await query

    console.log("result", result)
    //return false

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

export const postUser = async (req, res) => {
  try {
    const objectProfile = await Profile.create({      
      sequenceNumber: req.body.sequenceNumber,      
      address1: req.body.address1,
      address2: req.body.address2,
      address3: req.body.address3,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      mobile: req.body.mobile,
      pan: req.body.pan,      
      confirmed: req.body.confirmed,
      blocked: req.body.blocked
    })

    req.body.profile = objectProfile._id
    const object = await schemaName.create(req.body)

    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUserById = async (req, res) => {
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

export const putUser = async (req, res) => {
  try {

    const { id } = req.params
    const { department, designation, firstName, lastName, confirmed, blocked, password, email } = req.body

    const object = await schemaName.findById(id)
    
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.department = department
    object.designation = designation
    object.firstName = firstName
    object.lastName = lastName
    object.email = email
    object.address1 = address1
    object.address2 = address2
    object.address3 = address3
    object.city = city
    object.pincode = pincode
    object.state = state
    object.mobile = mobile
    object.pan = pan
    object.pf = pf
    object.esi = esi
    object.dob = dob
    object.salaryscheduletype = salaryscheduletype
    object.confirmed = confirmed
    object.blocked = blocked

    password && (object.password = await object.encryptPassword(password))

    if (name) {
      await Profile.findOneAndUpdate({ user: id }, { name })
    }

    await object.save()

    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params
    const object = await schemaName.findByIdAndDelete(id)

    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    await Profile.findOneAndDelete({
      user: object._id,
    })

    const userRole = await UserRole.findOne({ user: object._id })
    userRole && (await userRole.remove())
    
    //await object.remove()
    
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
