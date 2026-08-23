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
    const [destination, setDestination] = useState("Cape Town");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const searchParams = new URLSearchParams(location.search);

        setUser(savedUser ? JSON.parse(savedUser) : null);
        setMenuOpen(false);
        setSearchOpen(false);

        setDestination(searchParams.get("city") || "Cape Town");
        setCheckIn(searchParams.get("checkIn") || "");
        setCheckOut(searchParams.get("checkOut") || "");
        setGuests(Number(searchParams.get("guests")) || 1);
    }, [location.pathname, location.search]);

    const showSearch =
        !location.pathname.startsWith("/admin") &&
        !["/login", "/reservations"].includes(location.pathname);
    const showSearchSummary = location.pathname.startsWith("/locations");

    function formatSearchDates() {
        if (!checkIn || !checkOut) {
            return "Add dates";
        }

        const dateFormatter = new Intl.DateTimeFormat("en", {
            month: "short",
            day: "numeric",
        });

        return `${dateFormatter.format(
            new Date(`${checkIn}T00:00:00`)
        )} – ${dateFormatter.format(new Date(`${checkOut}T00:00:00`))}`;
    }

    function handleSearch(event) {
        event.preventDefault();

        const searchParams = new URLSearchParams({
            city: destination,
            guests: String(guests),
        });

        if (checkIn) {
            searchParams.set("checkIn", checkIn);
        }

        if (checkOut) {
            searchParams.set("checkOut", checkOut);
        }

        setSearchOpen(false);
        navigate(`/locations?${searchParams.toString()}`);
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

            <nav
                className={`header-navigation ${
                    showSearchSummary ? "header-navigation-hidden" : ""
                }`}
            >
                <Link to="/locations">Places to stay</Link>
                <Link to="/">Experiences</Link>
                <Link to="/">Online Experiences</Link>
            </nav>

            {showSearchSummary && !searchOpen && (
                <button
                    className="header-search-summary"
                    type="button"
                    onClick={() => setSearchOpen(!searchOpen)}
                >
                    <span>{destination}</span>
                    <span>{formatSearchDates()}</span>
                    <span>
                        {guests} {guests === 1 ? "guest" : "guests"}
                    </span>
                    <span className="header-search-summary-icon">
                        <FaSearch />
                    </span>
                </button>
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

            {showSearch && (
                <div
                    className={`header-search-row ${
                        showSearchSummary && !searchOpen
                            ? "header-search-row-collapsed"
                            : ""
                    }`}
                >
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
                            onChange={(event) =>
                                setDestination(event.target.value)
                            }
                        >
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

                    <label>
                        Guests
                        <select
                            value={guests}
                            onChange={(event) =>
                                setGuests(Number(event.target.value))
                            }
                        >
                            {[1, 2, 3, 4, 5, 6].map((guest) => (
                                <option value={guest} key={guest}>
                                    {guest}
                                </option>
                            ))}
                        </select>
                    </label>

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
