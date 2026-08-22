import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import LocationDetails from "./pages/LocationDetails";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/locations" element={<Locations />} />
                <Route
                    path="/locations/:id"
                    element={<LocationDetails/>}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;