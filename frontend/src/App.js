import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import ForgotPassword from "./screens/auth/ForgotPassword";
import Home from "./screens/auth/Home";
import Login from "./screens/auth/Login";
import NotFound from "./screens/auth/NotFound";
import ResetPassword from "./screens/auth/ResetPassword";
import Profile from "./screens/account/Profile";
import Menus from "./screens/admin/auth/Menus";
import ServiceTypes from "./screens/admin/auth/ServiceTypes";
import CustomerGroups from "./screens/admin/auth/CustomerGroups";
import HSNs from "./screens/admin/auth/HSNs";
import GSTTaxes from "./screens/admin/auth/GSTTaxes";
import Permissions from "./screens/admin/auth/Permissions";
import Departments from "./screens/admin/auth/Departments";
import Designations from "./screens/admin/auth/Designations";
import UnitConversions from "./screens/admin/auth/UnitConversions";
import Units from "./screens/admin/auth/Units";
import Cities from "./screens/admin/auth/Cities";
import States from "./screens/admin/auth/States";
import Roles from "./screens/admin/auth/Roles";
import UserRoles from "./screens/admin/auth/UserRoles";
import UserProfiles from "./screens/admin/auth/UserProfiles";
import Users from "./screens/admin/auth/Users";
import Companies from "./screens/admin/auth/Companies";
import Branches from "./screens/admin/auth/Branches";
import Employees from "./screens/admin/auth/Employees";
import Items from "./screens/admin/auth/Items";
import ItemGroups from "./screens/admin/auth/ItemGroups";
import Brand from "./screens/admin/auth/Brand";
import Categories from "./screens/admin/auth/Categories";
import ChannelPartners from "./screens/admin/auth/ChannelPartners";
import Customers from "./screens/admin/auth/Customers";
import { Layout, AuthLayout } from "./components";
import SalesVoucher from "./screens/admin/auth/SalesVoucher";
import ChangePassword from "./screens/admin/auth/ChangePassword";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/auth/reset-password/:restToken"
          element={<ResetPassword />}
        />
      </Route>
      <Route element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/admin/auth/menus" element={<Menus />} />
          <Route path="/admin/auth/service-types" element={<ServiceTypes />} />
          <Route path="/admin/auth/customer-groups" element={<CustomerGroups />} />
          <Route path="/admin/auth/hsns" element={<HSNs />} />
          <Route path="/admin/auth/gst-taxes" element={<GSTTaxes />} />
          <Route path="/admin/auth/departments" element={<Departments />} />
          <Route path="/admin/auth/designations" element={<Designations />} />
          <Route
            path="/admin/auth/unit-conversions"
            element={<UnitConversions />}
          />
          <Route path="/admin/auth/units" element={<Units />} />
          <Route path="/admin/auth/cities" element={<Cities />} />
          <Route path="/admin/auth/states" element={<States />} />
          <Route path="/admin/auth/permissions" element={<Permissions />} />
          <Route path="/admin/auth/roles" element={<Roles />} />
          <Route path="/admin/auth/user-roles" element={<UserRoles />} />
          <Route path="/admin/auth/user-profiles" element={<UserProfiles />} />
          <Route path="/admin/auth/users" element={<Users />} />
          <Route path="/admin/auth/companies" element={<Companies />} />
          <Route path="/admin/auth/branches" element={<Branches />} />
          <Route path="/admin/auth/employees" element={<Employees />} />
          <Route path="/admin/auth/items" element={<Items />} />
          <Route path="/admin/auth/item-groups" element={<ItemGroups />} />
          <Route path="/admin/auth/brand" element={<Brand />} />
          <Route path="/admin/auth/categories" element={<Categories />} />
          <Route path="/admin/auth/channel-partners" element={<ChannelPartners />} />
          <Route path="/admin/auth/customers" element={<Customers />} />
          <Route path="/admin/auth/sales-purchase" element={<SalesVoucher />} />
          <Route path="/admin/auth/change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
