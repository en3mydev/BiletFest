import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Festivaluri from "./pages/Festivaluri";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Profile from "./pages/Profile";
import Concerte from "./pages/Concerte";
import StandUp from "./pages/Standup";
import AdminProtect from "./pages/AdminProtect";
import Dashboard from "./pages/Dashboard";
import FestivalDetail from "./pages/FestivalDetail";

function App() {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="concerte" element={<Concerte />} />
        <Route path="stand-up" element={<StandUp />} />
        <Route path="festivaluri" element={<Festivaluri />} />
        <Route path="festivaluri/:id" element={<FestivalDetail />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route element={<Protected />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route element={<AdminProtect />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
