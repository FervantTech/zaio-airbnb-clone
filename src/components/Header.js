import { useEffect, useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import airbnbLogo from "../assets/images/airbnb-logo.svg";
import "../CSS/Header.css";

function Header() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [guestMenuOpen, setGuestMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const searchParams = new URLSearchParams(location.search);

        setUser(savedUser ? JSON.parse(savedUser) : null);
        setMenuOpen(false);
        setSearchOpen(false);

        setDestination(searchParams.get("city") || "");
        setCheckIn(searchParams.get("checkIn") || "");
        setCheckOut(searchParams.get("checkOut") || "");
        const savedAdults = searchParams.get("adults");
        const savedChildren = searchParams.get("children");
        const savedGuests = Number(searchParams.get("guests"));

        setAdults(
            savedAdults !== null
                ? Number(savedAdults)
                : savedGuests || 1
        );
        setChildren(
            savedChildren !== null ? Number(savedChildren) : 0
        );
        setGuestMenuOpen(false);
    }, [location.pathname, location.search]);

    const showSearch =
        !location.pathname.startsWith("/admin") &&
        !["/login", "/reservations"].includes(location.pathname);
    const isLoginPage = location.pathname === "/login";
    const guests = adults + children;

    function navigateToSearch(selectedDestination = destination) {
        const searchParams = new URLSearchParams({
            guests: String(guests),
            adults: String(adults),
            children: String(children),
        });

        if (selectedDestination) {
            searchParams.set("city", selectedDestination);
        }

        if (checkIn) {
            searchParams.set("checkIn", checkIn);
        }

        if (checkOut) {
            searchParams.set("checkOut", checkOut);
        }

        setSearchOpen(false);
        setGuestMenuOpen(false);
        navigate(`/locations?${searchParams.toString()}`);
    }

    function handleSearch(event) {
        event.preventDefault();
        navigateToSearch();
    }

    function handleDestinationChange(event) {
        const selectedDestination = event.target.value;
        setDestination(selectedDestination);
        navigateToSearch(selectedDestination);
    }

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

            {!isLoginPage && (
                <nav className="header-navigation">
                    <Link to="/locations">Places to stay</Link>
                    <Link to="/">Experiences</Link>
                    <Link to="/">Online Experiences</Link>
                </nav>
            )}

            {showSearch && (
                <button
                    className="mobile-search-toggle"
                    type="button"
                    onClick={() => setSearchOpen(!searchOpen)}
                >
                    <span>Start your search</span>
                    <FaSearch />
                </button>
            )}

            {!isLoginPage && <div className="header-profile">
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
            </div>}

            {showSearch && (
                <div className="header-search-row">
                    <form
                        className={`header-search ${
                            searchOpen ? "header-search-open" : ""
                        }`}
                        onSubmit={handleSearch}
                    >
                    <label>
                        Location
                        <select
                            value={destination}
                            onChange={handleDestinationChange}
                        >
                            <option value="">All Locations</option>
                            <option value="Cape Town">Cape Town</option>
                            <option value="Johannesburg">Johannesburg</option>
                            <option value="Durban">Durban</option>
                            <option value="Pretoria">Pretoria</option>
                        </select>
                    </label>

                    <label>
                        Check in
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(event) =>
                                setCheckIn(event.target.value)
                            }
                        />
                    </label>

                    <label>
                        Check out
                        <input
                            type="date"
                            min={checkIn}
                            value={checkOut}
                            onChange={(event) =>
                                setCheckOut(event.target.value)
                            }
                        />
                    </label>

                    <div className="guest-picker">
                        <button
                            className="guest-picker-toggle"
                            type="button"
                            onClick={() => setGuestMenuOpen(!guestMenuOpen)}
                            aria-expanded={guestMenuOpen}
                        >
                            <strong>Guests</strong>
                            <span>
                                {guests} {guests === 1 ? "guest" : "guests"}
                            </span>
                        </button>

                        {guestMenuOpen && (
                            <div className="guest-picker-menu">
                                <div className="guest-counter-row">
                                    <span>Adults</span>
                                    <div className="guest-counter-controls">
                                        <button
                                            type="button"
                                            onClick={() => setAdults(Math.max(0, adults - 1))}
                                            disabled={adults === 0}
                                            aria-label="Remove an adult"
                                        >
                                            −
                                        </button>
                                        <span>{adults}</span>
                                        <button
                                            type="button"
                                            onClick={() => setAdults(adults + 1)}
                                            aria-label="Add an adult"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="guest-counter-row">
                                    <span>Children</span>
                                    <div className="guest-counter-controls">
                                        <button
                                            type="button"
                                            onClick={() => setChildren(Math.max(0, children - 1))}
                                            disabled={children === 0}
                                            aria-label="Remove a child"
                                        >
                                            −
                                        </button>
                                        <span>{children}</span>
                                        <button
                                            type="button"
                                            onClick={() => setChildren(children + 1)}
                                            aria-label="Add a child"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                        <button
                            className="header-search-button"
                            type="submit"
                            aria-label="Search accommodations"
                        >
                            <FaSearch />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}

export default Header;
