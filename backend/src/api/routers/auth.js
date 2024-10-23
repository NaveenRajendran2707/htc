import express from 'express'
import { isAuth } from '../../utils/auth.js'
import {
  getEmployees,
  postEmployee,
  putEmployee,
  deleteEmployee,
} from '../controllers/auth/employees.js'
import {
  getServiceTypes,
  postServiceType,
  putServiceType,
  deleteServiceType,
} from '../controllers/auth/service-types.js'
import {
  getGSTTaxes,
  postGSTTax,
  putGSTTax,
  deleteGSTTax,
} from '../controllers/auth/gst-taxes.js'
import {
  getHSNs,
  postHSN,
  putHSN,
  deleteHSN,
} from '../controllers/auth/hsns.js'
import {
  getUnits,
  postUnit,
  putUnit,
  deleteUnit,
} from '../controllers/auth/units.js'
import {
  getUnitConversions,
  postUnitConversion,
  putUnitConversion,
  deleteUnitConversion,
} from '../controllers/auth/unit-conversions.js'
import {
  getPermissions,
  postPermission,
  putPermission,
  deletePermission,
} from '../controllers/auth/permissions.js'
import {
  getDepartments,
  postDepartment,
  putDepartment,
  deleteDepartment,
} from '../controllers/auth/departments.js'
import {
  getDesignations,
  postDesignation,
  putDesignation,
  deleteDesignation,
} from '../controllers/auth/designations.js'
import {
  getStates,
  postState,
  putState,
  deleteState,
} from '../controllers/auth/states.js'
import {
  getCities,
  postCity,
  putCity,
  deleteCity,
} from '../controllers/auth/cities.js'
import {
  deleteRole,
  getRoles,
  postRole,
  putRole,
} from '../controllers/auth/roles.js'
import {
  getMenus,
  postMenu,
  putMenu,
  deleteMenu,
} from '../controllers/auth/menus.js'
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getUserById,
} from '../controllers/auth/users.js'
import {
  getCompanies,
  postCompany,
  putCompany,
  deleteCompany,
  getCompanyById,
} from '../controllers/auth/companies.js'
import {
  getBranches,
  postBranch,
  putBranch,
  deleteBranch,
  getBranchById,
} from '../controllers/auth/branches.js'
import {
  getUserRoles,
  postUserRole,
  deleteUserRole,
  putUserRole,
  postUserRoleById,
} from '../controllers/auth/user-roles.js'
import { getProfile, postProfile } from '../controllers/auth/profile.js'
import { getUserProfiles } from '../controllers/auth/user-profiles.js'
import { login } from '../controllers/auth/login.js'
import { postForgotPassword } from '../controllers/auth/forgot-password.js'
import { postResetPassword } from '../controllers/auth/reset-password.js'
import { seed } from '../controllers/auth/seed.js'

const router = express.Router()

// login
router.route('/api/auth/login').post(login)

// forgot password
router.route('/api/auth/forgot-password').post(postForgotPassword)

// reset password
router.route('/api/auth/reset-password').post(postResetPassword)

// // seed
router.route('/api/auth/seed').get(seed)

// user profiles
router.route('/api/auth/user-profiles').get(isAuth, getUserProfiles)


// employee
router
  .route('/api/auth/employees')
  .get(isAuth, getEmployees)
  .post(isAuth, postEmployee)
router
  .route('/api/auth/employees/:id')
  .put(isAuth, putEmployee)
  .delete(isAuth, deleteEmployee)


// service type
router
  .route('/api/auth/service-types')
  .get(isAuth, getServiceTypes)
  .post(isAuth, postServiceType)
router
  .route('/api/auth/service-types/:id')
  .put(isAuth, putServiceType)
  .delete(isAuth, deleteServiceType)


// gst tax
router
  .route('/api/auth/gst-taxes')
  .get(isAuth, getGSTTaxes)
  .post(isAuth, postGSTTax)
router
  .route('/api/auth/gst-taxes/:id')
  .put(isAuth, putGSTTax)
  .delete(isAuth, deleteGSTTax)


// hsn
router
  .route('/api/auth/hsns')
  .get(isAuth, getHSNs)
  .post(isAuth, postHSN)
router
  .route('/api/auth/hsns/:id')
  .put(isAuth, putHSN)
  .delete(isAuth, deleteHSN)



// permissions
router
  .route('/api/auth/permissions')
  .get(isAuth, getPermissions)
  .post(isAuth, postPermission)
router
  .route('/api/auth/permissions/:id')
  .put(isAuth, putPermission)
  .delete(isAuth, deletePermission)

// unit
router
  .route('/api/auth/units')
  .get(isAuth, getUnits)
  .post(isAuth, postUnit)
router
  .route('/api/auth/units/:id')
  .put(isAuth, putUnit)
  .delete(isAuth, deleteUnit)

// unit conversion
router
  .route('/api/auth/unit-conversions')
  .get(isAuth, getUnitConversions)
  .post(isAuth, postUnitConversion)
router
  .route('/api/auth/unit-conversions/:id')
  .put(isAuth, putUnitConversion)
  .delete(isAuth, deleteUnitConversion)  

// department
router
  .route('/api/auth/departments')
  .get(isAuth, getDepartments)
  .post(isAuth, postDepartment)
router
  .route('/api/auth/departments/:id')
  .put(isAuth, putDepartment)
  .delete(isAuth, deleteDepartment)

// designation
router
  .route('/api/auth/designations')
  .get(isAuth, getDesignations)
  .post(isAuth, postDesignation)
router
  .route('/api/auth/designations/:id')
  .put(isAuth, putDesignation)
  .delete(isAuth, deleteDesignation)  


// state
router
  .route('/api/auth/states')
  .get(isAuth, getStates)
  .post(isAuth, postState)
router
  .route('/api/auth/states/:id')
  .put(isAuth, putState)
  .delete(isAuth, deleteState)

// city
router
  .route('/api/auth/cities')
  .get(isAuth, getCities)
  .post(isAuth, postCity)
router
  .route('/api/auth/cities/:id')
  .put(isAuth, putCity)
  .delete(isAuth, deleteCity)  

// roles
router.route('/api/auth/roles').get(isAuth, getRoles).post(isAuth, postRole)
router
  .route('/api/auth/roles/:id')
  .put(isAuth, putRole)
  .delete(isAuth, deleteRole)

// menus
router
  .route('/api/auth/menus')
  .get(isAuth, getMenus)
  .post(isAuth, postMenu)
router
  .route('/api/auth/menus/:id')
  .put(isAuth, putMenu)
  .delete(isAuth, deleteMenu)

// profile
router
  .route('/api/auth/profile')
  .get(isAuth, getProfile)
  .post(isAuth, postProfile)

// user roles
router
  .route('/api/auth/user-roles')
  .get(isAuth, getUserRoles)
  .post(isAuth, postUserRole)
router
  .route('/api/auth/user-roles/:id')
  .put(isAuth, putUserRole)
  .delete(isAuth, deleteUserRole)
  .post(postUserRoleById)

// users
router.route('/api/auth/users').get(isAuth, getUsers).post(isAuth, postUser)
router
  .route('/api/auth/users/:id')
  .put(isAuth, putUser)
  .delete(isAuth, deleteUser)
  .get(isAuth, getUserById)


// companies
router.route('/api/auth/companies').get(isAuth, getCompanies).post(isAuth, postCompany)
router
  .route('/api/auth/companies/:id')
  .put(isAuth, putCompany)
  .delete(isAuth, deleteCompany)
  .get(isAuth, getCompanyById)

// branches
router.route('/api/auth/branches').get(isAuth, getBranches).post(isAuth, postBranch)
router
  .route('/api/auth/branches/:id')
  .put(isAuth, putBranch)
  .delete(isAuth, deleteBranch)
  .get(isAuth, getBranchById)

export default router
