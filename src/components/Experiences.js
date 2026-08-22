import tripImage from "../assets/images/trip-experience.jpg";
import homeImage from "../assets/images/home-experience.jpg";
import "../CSS/Experiences.css";

function Experiences() {
    return (
        <section className="experiences">
            <h2>Discover Airbnb Experiences</h2>

            <div className="experiences-grid">
                <article
                    className="experience-card"
                    style={{ backgroundImage: `url(${tripImage})` }}
                >
                    <div className="experience-content">
                        <h3>Things to do on your trip</h3>
                        <button type="button">Experiences</button>
                    </div>
                </article>

                <article
                    className="experience-card"
                    style={{ backgroundImage: `url(${homeImage})` }}
                >
                    <div className="experience-content">
                        <h3>Things to do from home</h3>
                        <button type="button">Online Experiences</button>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Experiences;