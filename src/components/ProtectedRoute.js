import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
        return <Navigate to="/login" replace />;
    }

    const user = JSON.parse(savedUser);
    const isAdmin = ["host", "admin"].includes(user.role);

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
