// const roles = [
//   {
//     name: 'Super Admin',
//     description:
//       'Super Admins can access and manage all features and settings.',
//     type: 'SUPER_ADMIN',
//   },
//   {
//     name: 'Author',
//     description: 'Authors can manage the content they have created.',
//     type: 'AUTHOR',
//   },
//   {
//     name: 'Editor',
//     description:
//       'Editors can manage and publish contents including those of other users.',
//     type: 'EDITOR',
//   },
//   {
//     name: 'Public',
//     description: 'Default role given to unauthenticated user.',
//     type: 'PUBLIC',
//   },
//   {
//     name: 'Authenticated',
//     description: 'Default role given to authenticated user.',
//     type: 'AUTHENTICATED',
//   },
// ]

// const users = {
//   name: 'John Chinnathambi',
//   email: 'php.john.c@gmail.com',
//   password: '123456',
//   confirmed: true,
//   blocked: false,
// }

// const profile = {
//   phone: '+919841290360',
//   address: 'Chennai',
//   image: '',
//   bio: 'Technical Architect',
// }

// const menus = [
//   {
//     name: 'Home',
//     path: '/',
//     menu: 'hidden',
//     auth: true,
//     description: 'Home page',
//   },
//   {
//     name: 'Users',
//     path: '/admin/auth/users',
//     menu: 'admin',
//     auth: true,
//     description: 'Users page',
//   },
//   {
//     name: 'Roles',
//     path: '/admin/auth/roles',
//     menu: 'admin',
//     auth: true,
//     description: 'Roles page',
//   },
//   {
//     name: 'Profile',
//     path: '/account/profile',
//     menu: 'profile',
//     auth: true,
//     description: 'Profile page',
//   },
//   {
//     name: 'Permissions',
//     path: '/admin/auth/permissions',
//     menu: 'admin',
//     auth: true,
//     description: 'Permissions page',
//   },
//   {
//     name: 'Menus',
//     path: '/admin/auth/menus',
//     menu: 'admin',
//     auth: true,
//     description: 'Menus page',
//   },
//   {
//     name: 'User Roles',
//     path: '/admin/auth/user-roles',
//     menu: 'admin',
//     auth: true,
//     description: 'User Roles page',
//   },
//   {
//     name: 'User Profiles',
//     path: '/admin/auth/user-profiles',
//     menu: 'admin',
//     auth: true,
//     description: 'User Profiles page',
//   },
// ]

// const permissions = [
//   {
//     description: 'Get All Users',
//     route: '/api/auth/users',
//     auth: true,
//     name: 'Users',
//     method: 'GET',
//   },
//   {
//     description: 'Get User By Id',
//     route: '/api/auth/users/:id',
//     auth: true,
//     name: 'Users',
//     method: 'GET',
//   },
//   {
//     description: 'Create User',
//     route: '/api/auth/users',
//     auth: true,
//     name: 'Users',
//     method: 'POST',
//   },
//   {
//     description: 'Update User',
//     route: '/api/auth/users/:id',
//     auth: true,
//     name: 'Users',
//     method: 'PUT',
//   },
//   {
//     description: 'Delete User',
//     route: '/api/auth/users/:id',
//     auth: true,
//     name: 'Users',
//     method: 'DELETE',
//   },
//   {
//     description: 'Login',
//     route: '/api/auth/login',
//     auth: false,
//     name: 'Login',
//     method: 'POST',
//   },
//   {
//     description: 'Forgot Password',
//     route: '/api/auth/forgot-password',
//     auth: false,
//     name: 'Forgot Password',
//     method: 'POST',
//   },
//   {
//     description: 'Reset Password',
//     route: '/api/auth/reset-password',
//     auth: false,
//     name: 'Reset Password',
//     method: 'POST',
//   },
//   {
//     description: 'Get All User Profiles',
//     route: '/api/auth/user-profiles',
//     auth: true,
//     name: 'User Profiles',
//     method: 'GET',
//   },
//   {
//     description: 'Get Profile',
//     route: '/api/auth/profile',
//     auth: true,
//     name: 'User Profile',
//     method: 'GET',
//   },
//   {
//     description: 'Update Profile',
//     route: '/api/auth/profile',
//     auth: true,
//     name: 'User Profile',
//     method: 'POST',
//   },
//   {
//     description: 'Get All Roles',
//     route: '/api/auth/roles',
//     auth: true,
//     name: 'Roles',
//     method: 'GET',
//   },
//   {
//     description: 'Create Role',
//     route: '/api/auth/roles',
//     auth: true,
//     name: 'Roles',
//     method: 'POST',
//   },
//   {
//     description: 'Update Role',
//     route: '/api/auth/roles/:id',
//     auth: true,
//     name: 'Roles',
//     method: 'PUT',
//   },
//   {
//     description: 'Delete Role',
//     route: '/api/auth/roles/:id',
//     auth: true,
//     name: 'Roles',
//     method: 'DELETE',
//   },
//   {
//     description: 'Get All Permissions',
//     route: '/api/auth/permissions',
//     auth: true,
//     name: 'Permissions',
//     method: 'GET',
//   },
//   {
//     description: 'Create Permission',
//     route: '/api/auth/permissions',
//     auth: true,
//     name: 'Permissions',
//     method: 'POST',
//   },
//   {
//     description: 'Update Permission',
//     route: '/api/auth/permissions/:id',
//     auth: true,
//     name: 'Permissions',
//     method: 'PUT',
//   },
//   {
//     description: 'Delete Permission',
//     route: '/api/auth/permissions/:id',
//     auth: true,
//     name: 'Permissions',
//     method: 'DELETE',
//   },
//   {
//     description: 'Get All User Roles',
//     route: '/api/auth/user-roles',
//     auth: true,
//     name: 'User Roles',
//     method: 'GET',
//   },
//   {
//     description: 'Get User Roles By Id With POST',
//     route: '/api/auth/user-roles/:id',
//     auth: false,
//     name: 'User Roles',
//     method: 'POST',
//   },
//   {
//     description: 'Create User Role',
//     route: '/api/auth/user-roles',
//     auth: true,
//     name: 'User Roles',
//     method: 'POST',
//   },
//   {
//     description: 'Update User Role',
//     route: '/api/auth/user-roles/:id',
//     auth: true,
//     name: 'User Roles',
//     method: 'PUT',
//   },
//   {
//     description: 'Delete User Role',
//     route: '/api/auth/user-roles/:id',
//     auth: true,
//     name: 'User Roles',
//     method: 'DELETE',
//   },
//   {
//     description: 'Get All Menus',
//     route: '/api/auth/menus',
//     auth: true,
//     name: 'Menus',
//     method: 'GET',
//   },
//   {
//     description: 'Create Permission',
//     route: '/api/auth/menus',
//     auth: true,
//     name: 'Menus',
//     method: 'POST',
//   },
//   {
//     description: 'Update Permission',
//     route: '/api/auth/menus/:id',
//     auth: true,
//     name: 'Menus',
//     method: 'PUT',
//   },
//   {
//     description: 'Delete Permission',
//     route: '/api/auth/menus/:id',
//     auth: true,
//     name: 'Menus',
//     method: 'DELETE',
//   },
// ]

// const states = [
//   {
//     stateID: 'ST01',
//     stateName: 'Tamilnadu',
//     stateShortName: 'TN',
//     stateGSTCode: '33',
//   },
//   {
//     stateID: 'ST02',
//     stateName: 'Kerala',
//     stateShortName: 'KL',
//     stateGSTCode: '34',
//   }
// ]

// const cities = [
//   {
//     state: 'ST01',
//     cityID: 'CT01',
//     cityName: 'Chennai',
//     cityShortName: 'CHN',
//   },
//   {
//     state: 'ST01',
//     cityID: 'CT02',
//     cityName: 'Madurai',
//     cityShortName: 'MDU',
//   },
// ]

// const companies = [
//   {
//     companySerialNo: 'CMP01',
//     registrationDate: '2024-06-12',
//     introductionID: 'TNCHN56789CP',
//     city: 'CT01',
//     companyID: 'TNCHN123456',
//     typeofService: 'S-1',
//     companyType: 'Proprietor',
//     user: '66cc220075d69b52d4a4292e',
//     companyName: 'ACB Agency',
//     companyShortName: 'ACB',
//     gSTINNumber: '33ABCDE1234F1ZR',
//     companyAdminName: '66cc220075d69b52d4a4292e',
//     address1: '#3',
//     address2: 'Ramkrishna Street',
//     address3: 'Kodambakkam',
//     pincode: '600078',
//     mobileNumber1: '9876543210',
//     mobileNumber2: '04412345678',
//     phoneNumber: '04412345678',
//     email: 'hramkumar@gmail.com',
//     logo: 'acbagency.jpg',
//     watermark: 'ACB Agency',
//     blocked: false
//   }
// ]

// const branches = [
//   {
//     branchSerialNo: 'CMP01',
//     registrationDate: '2024-06-12',
//     companyID: 'TNCHN56789CP',
//     city: 'CT01',
//     branchID: 'TNCHN123456',
//     user: '66cc220075d69b52d4a4292e',
//     branchName: 'ACB Agency',
//     branchShortName: 'ACB',
//     gSTINNumber: '33ABCDE1234F1ZR',
//     address1: '#3',
//     address2: 'Ramkrishna Street',
//     address3: 'Kodambakkam',
//     pincode: '600078',
//     mobileNumber: '9876543210',
//     phoneNumber: '04412345678',
//     email: 'hramkumar@gmail.com',
//     logo: 'acbagency.jpg',
//     watermark: 'ACB Agency',
//     blocked: false
//   }
// ]

// const departments = [
//   {
//     departmentSerialNo: 'DEP01',
//     department: 'Sales',
//   },
//   {
//     departmentSerialNo: 'DEP02',
//     department: 'Purchase',
//   }
// ]

// const designations = [
//   {
//     designationSerialNo: 'DES01',
//     department: 'Sales',
//     designation: 'Manager',
//   },
//   {
//     designationSerialNo: 'DES02',
//     department: 'Sales',
//     designation: 'Executive',
//   }
// ]

// const units = [
//   {
//     unitSerialNo: 'UNT01',
//     unitName: 'Kgs',
//   },
//   {
//     unitSerialNo: 'UNT02',
//     unitName: 'Pcs',
//   }
// ]

// const unitconversions = [
//   {
//     unitConversionSerialNo: 'UCV01',
//     mainUnit: 'Kgs',
//     subUnit: 'Gms',
//     conversionFactor: '1000',
//   },
//   {
//     unitConversionSerialNo: 'UCV02',
//     mainUnit: 'Pcs',
//     subUnit: 'Box',
//     conversionFactor: '10000000',
//   }
// ]

// const servicetype = [
//   {
//     serviceSerialNo: 'SER01',
//     serviceName: 'S1',
//     particular: 'With GST',
//     fees: '500',
//     status: 'Active',
//   },
// ]

// const gsttax = [
//   {
//     gSTTaxSerialNo: 'GST01',
//     name: "Three Percent",
//     gSTTax: '18%',
//   },
// ]

const changepassword = [
  {
  password :'123456'
  },
]

// const hsn = [
//   {
//     hSNCodeSerialNo: 'HSN01',
//     hSNCode: '123456',
//     description: 'MONDAY',
//   },
// ]

// const employees = [
//   {
//     sequenceNumber: 1,
//     employeeID: 'EMP000001',
//     department: '67136bdb084cbb55eb19f982',
//     designation: '67138585388ddb02a7360ee6',
//     address1: '#3',
//     address2: 'Ramkrishna Street',
//     address3: 'Kodambakkam',
//     city: '6712a5b97896175f6aa5ff30',
//     pincode: '600010',
//     state: '67127d2842a1ca2065ce468d',
//     mobile: '9841290999',
//     pan: 'ALSER5454E',
//     pf: '23424234324234',
//     esi: '23423423423',
//     dob: '2024-10-24',
//     salaryscheduletype: 'Weekly',
//     user: '66cc220075d69b52d4a4292e',
//   },
// ]

// const channelpartners = [
//   {
//     sequenceNumber: 1,
//     channelPartnerSerialNo: 'CPT000001',
//     registrationDate: '2024-10-24',
//     state: 'TamilNadu',
//     city: 'Chennai',
//     introductionID: 'TNCHN12345CO',
//     channelPartnerID: 'TNCHN12345CP',
//     userID: 'RamKumarH',
//     name:'Mr. H.Ram Kumar',
//     address1: '#3',
//     address2: 'Ramkrishna Street',
//     address3: 'Kodambakkam',
//     pincode: '600 078',
//     mobileNumber: '044 12345678',
//     phoneNumber:'044 12345678',
//     emailID:'mailto:hramkumar@gmail.com',
//     panNumber: 'ABCDE1234F',
//     planType: '',
//     bankAccountNumber: '',
//     IFSCCode: '',
//     profilePicture: '',
//     blocked: false,
//   },
// ]

// const accounts = [
//   {
//     sequenceNumber: 1,
//     accountSerialNo: 'ACC000001',
//     accountGroup: 'Sundry Creditors',
//     accountName: 'Mr. H.Ram Kumar',
//     aliasName: 'Chennai',
//     address1: '#3',
//     address2: 'Ramkrishna Street',
//     address3: 'Kodambakkam',
//     city: 'Chennai',
//     state: 'TamilNadu',
//     pincode: '600 078',
//     mobileNumber: '044 12345678',
//     emailID:'mailto:hramkumar@gmail.com',
//     GSTINNo: 'ABCDE1234F',
//     panNo: '',
//     transportName: '',
//     openingBalance: '',
//     password: '',
//     blocked: false,
//   },
// ]


// const accountgroups = [
//   {
//     sequenceNumber: 1,
//     accountGroupSerialNo: 'AGP00001',
//     accountGroup: 'Sundry Creditors',
//     accountSubGroup: 'MONDAY', 
    
//   }
// ];

// const itemgroup = [
//   {
//     sequenceNumber: 1,
//     itemGroupSerialNo: "IGP00001",
//     itemGroup: "General",
//     itemSubGroup: "PVC",
//   },
// ];

// const items = [
//   {
//     sequenceNumber: 1,
//     itemSerialNo: "ITM00001",
//     branchName: "ACB Agency",
//     groupName: "ABC",
//     productCategory: "General",
//     name: "Captian",
//     aliasName: "Miller",
//     uom: "Pcs",
//     cost: "950",
//     listPrice: "850",
//     discount: "20%",
//     marginPrice: "600",
//     MRP: "1000",
//     batchNo: "CMP01",
//     expiryDate: "2024-06-12",
//     freeGiftQty: "2",
//     HSNCode: "123456",
//     GSTTaxRate: "18%",
//     reOrderQty: "1",
//     openingStockQty: "2",
//     openingStockValue: "AB",
//     productImage: "",
//     blocked: false,
//   },
// ];

// const brand = [
//   {
//     sequenceNumber: 1,
//     brandSerialNo: "BRD00001",
//     brandName: "PVC",
//     discount: "20%",
//     margin: "1%"
//   },
// ];

// const category = [
//   {
//     sequenceNumber: 1,
//     categorySerialNo: "CTG00001",
//     categoryName: "PVC",
//     discount: "20%",
//     margin: "1%"
//   },
// ];


//export { roles, users, profile, permissions, menus, states, cities, companies, branches, departments, designations, units, unitconversions, servicetype, gsttax, hsn, employees, accountgroups, itemgroup, items, brand, category, channelpartners, accounts }

export { changepassword };
