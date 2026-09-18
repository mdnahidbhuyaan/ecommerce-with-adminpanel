import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/loging";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdimnDashboard from "./pages/admin-view/dashboard";
import AdimnProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdimnFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<AdimnDashboard/>}/>
            <Route path="products" element={<AdimnProducts/>}/>
            <Route path="orders" element={<AdminOrders/>}/>
            <Route path="features" element={<AdimnFeatures/>}/>
        </Route>
        <Route path="/shop" element={<ShoppingLayout/>}></Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;
