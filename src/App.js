import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Reservations from "./pages/Reservations";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:id" element={<LocationDetails />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["host", "admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute allowedRoles={["host", "admin"]}>
              <CreateListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <ProtectedRoute allowedRoles={["host", "admin"]}>
              <UpdateListing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
