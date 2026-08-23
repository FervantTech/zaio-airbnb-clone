import { useEffect, useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import airbnbLogo from "../assets/images/airbnb-logo.svg";
import "../CSS/Header.css";

function Header() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        setUser(savedUser ? JSON.parse(savedUser) : null);
        setMenuOpen(false);
    }, [location.pathname]);

function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);
    navigate("/");
}

    return (
        <header className="header">
            <Link className="header-logo" to="/">
                <img src={airbnbLogo} alt="Airbnb logo" />
            </Link>

            <nav className="header-navigation">
                <Link to="/locations">Places to stay</Link>
                <Link to="/">Experiences</Link>
                <Link to="/">Online Experiences</Link>
            </nav>

            <div className="header-profile">
                {!user && <Link to="/admin">Become a host</Link>}

                {user ? (
                    <div className="user-menu">
                        <span>Hello, {user.username}</span>

                        <button
                            className="profile-button"
                            type="button"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Open profile menu"
                        >
                            <FaBars />
                            <FaUserCircle />
                        </button>

                        {menuOpen && (
                            <div className="profile-dropdown">
                                {["host", "admin"].includes(user.role) && (
                                    <Link to="/admin">
                                        Dashboard
                                    </Link>
                                )}

                                <Link to="/reservations">
                                    View reservations
                                </Link>

                                <button type="button" onClick={handleLogout}>
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link className="profile-button" to="/login">
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
