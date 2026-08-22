import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-banner.jpg";
import "../CSS/Hero.css";

function Hero() {
    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className="hero-content">
                <h1>Not sure where to go? Perfect.</h1>

                <Link className="hero-button" to="/locations">
                    I’m flexible
                </Link>
            </div>
        </section>
    );
}

export default Hero;