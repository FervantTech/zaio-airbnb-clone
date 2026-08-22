import { Link } from "react-router-dom";
import "../CSS/Header.css";
import airbnbLogo from "../assets/images/airbnb-logo.svg";

function Header() {
    return (
        <header className="header">
            <Link className="header-logo" to="/">
                <img src={airbnbLogo} alt="airbnblogo" /> 
            </Link>

            <nav className="header-navigation">
                <Link to="/locations">Places to stay</Link>
                <Link to="/">Experiences</Link>
                <Link to="/">Online Experiences</Link>
            </nav>

            <div className="header-profile">
                <Link to="/admin">Become a host</Link>
                {/* insert globe material icon */}
                <Link className="profile-button" to="/login">
                    Login
                </Link>
            </div>
        </header>
    );
}

export default Header;