import { NavLink } from "react-router-dom";
import "../CSS/AdminNavigation.css";

function AdminNavigation() {
    function getLinkClass({ isActive }) {
        return isActive ? "admin-nav-active" : "";
    }

    return (
        <nav className="admin-navigation" aria-label="Admin navigation">
            <NavLink to="/reservations" className={getLinkClass}>
                View reservations
            </NavLink>

            <NavLink to="/admin" end className={getLinkClass}>
                View listings
            </NavLink>

            <NavLink to="/admin/create" className={getLinkClass}>
                Create listing
            </NavLink>
        </nav>
    );
}

export default AdminNavigation;
