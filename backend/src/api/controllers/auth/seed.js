// import User from '../../models/User.js'
// import Profile from '../../models/Profile.js'
// import Role from '../../models/Role.js'
// import Permission from '../../models/Permission.js'
// import UserRole from '../../models/UserRole.js'
// import ClientPermission from '../../models/ClientPermission.js'
// import City from '../../models/City.js'
// import State from '../../models/State.js'
// import Company from '../../models/Company.js'
// import Branch from '../../models/Branch.js'
// import Department from '../../models/Department.js'
// import Designation from '../../models/Designation.js'
// import Unit from '../../models/Unit.js'
// import UnitConversion from '../../models/UnitConversion.js'
// import ServiceType from '../../models/ServiceType.js'
// import GSTTax from '../../models/GSTTax.js'
// import HSN from '../../models/HSN.js'
// import Employee from '../../models/Employee.js'
// import ItemGroup from '../../models/ItemGroup.js'
// import Items from "../../models/Items.js";
// import Brand from '../../models/Brand.js'
import Category from '../../models/Category.js'

import {
  // users,
  // profile,
  // roles,
  // permissions,
  // clientPermissions,
  // states,
  // cities,
  // companies,
  // branches,
  // departments,
  // designations,
  // units,
  // unitconversions,
  // servicetype,
  // gsttax,
  // hsn,
  // employees,
  // itemgroup,
  // items,
  // brand,
  category
} from "../../../config/data.js";

const secret = "js";

export const seed = async (req, res) => {
  try {
    if (!req.query.secret || req.query.secret !== secret)
      return res.status(401).json({ error: "Unauthorized" });

    // Delete all existing data
    // await User.deleteMany({})
    // await Profile.deleteMany({})
    // await Role.deleteMany({})
    // await Permission.deleteMany({})
    // await UserRole.deleteMany({})
    // await ClientPermission.deleteMany({})
    // await State.deleteMany({})
    // await City.deleteMany({})
    // await Company.deleteMany({})
    // await Branch.deleteMany({})
    // await Department.deleteMany({})
    // await Designation.deleteMany({})
    // await Unit.deleteMany({})
    // await UnitConversion.deleteMany({})
    // await ServiceType.deleteMany({})
    // await GSTTax.deleteMany({})
    // await HSN.deleteMany({})
    // await Employee.deleteMany({})
    // await ItemGroup.deleteMany({})
    // await Items.deleteMany({});
    // await Brand.deleteMany({})
    await Category.deleteMany({})

    //Create Category
    await Category.create(category)

    // //Create Brand
    // await Brand.create(brand)

    // //Create Items
    // await Items.create(items);

    // //Create Item Group
    // await ItemGroup.create(itemgroup)

    // // Create Employee
    // await Employee.create(employees)

    // // Create Service Type
    // await ServiceType.create(servicetype)

    // // Create GST Tax
    // await GSTTax.create(gsttax)

    // // Create HSN
    // await HSN.create(hsn)

    // Create Units
    // await Unit.create(units)

    // // Create Unit Conversions
    // await UnitConversion.create(unitconversions)

    // Department Branch
    // await Department.create(departments)

    // Designation Branch
    // await Designation.create(designations)

    // Create Branch
    //await Branch.create(branches)

    // Create Company
    //await Company.create(companies)

    // Create States
    // await State.create(states)

    // Create Cities
    // await City.create(cities)

    // // Create users
    // const userObject = await User.create({
    //   name: users.name,
    //   email: users.email,
    //   password: users.password,
    //   confirmed: true,
    //   blocked: false,
    // })

    // // Create profiles for users
    // await Profile.create({
    //   user: userObject._id,
    //   name: userObject.name,
    //   address: profile.address,
    //   phone: profile.phone,
    //   bio: profile.bio,
    //   image: `https://avatars.githubusercontent.com/u/3984336?v=4`,
    // })

    // // Check duplicate permissions
    // permissions.map((p) => {
    //   if (p.method && p.route) {
    //     const duplicate = permissions.filter(
    //       (p2) => p2.method === p.method && p2.route === p.route
    //     )
    //     if (duplicate.length > 1) {
    //       return res.status(500).json({
    //         error: `Duplicate permission: ${p.method} ${p.route}`,
    //       })
    //     }
    //   }
    // })

    // // Create permissions
    // const permissionObjects = await Permission.create(permissions)

    // // Create client permissions
    // const clientPermissionObjects = await ClientPermission.create(
    //   clientPermissions
    // )

    // // Create roles
    // const roleObjects = await Role.create(roles)

    // // Create user roles
    // roleObjects.map(
    //   async (r) =>
    //     r.type === 'SUPER_ADMIN' &&
    //     (await UserRole.create({
    //       user: userObject._id,
    //       role: r._id,
    //     }))
    // )

    // // Find super admin role
    // const superAdminRole = roleObjects.find((r) => r.type === 'SUPER_ADMIN')

    // // Create permissions for super admin role
    // superAdminRole.permission = permissionObjects.map((p) => p._id)

    // // create client permissions for super admin role
    // superAdminRole.clientPermission = clientPermissionObjects.map((p) => p._id)

    // // Update super admin role
    // await superAdminRole.save()

    res.status(200).json({
      message: "Database seeded successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
