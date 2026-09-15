import {
    FaBaby,
    FaBroom,
    FaCalendarTimes,
    FaClock,
    FaDoorOpen,
    FaExclamationTriangle,
    FaGlassCheers,
    FaPaw,
    FaShieldAlt,
    FaSmokingBan,
    FaUsers,
    FaVolumeMute,
} from "react-icons/fa";

const houseRules = [
    [FaClock, "Check-in: After 4:00 PM"],
    [FaClock, "Check-out: 10:00 AM"],
    [FaDoorOpen, "Self check-in with lock-box"],
    [FaBaby, "Not suitable for infants (under 2 years)"],
    [FaSmokingBan, "No smoking"],
    [FaPaw, "No pets"],
    [FaGlassCheers, "No parties or events"],
];

const safetyItems = [
    [FaBroom, "Committed to Airbnb’s enhanced cleaning process."],
    [FaUsers, "Airbnb’s social-distancing and other safety guidelines apply"],
    [FaVolumeMute, "Carbon monoxide alarm"],
    [FaShieldAlt, "Smoke alarm"],
    [FaExclamationTriangle, "Security deposit may apply if you damage the home"],
];

function InformationList({ items }) {
    return (
        <ul className="things-list">
            {items.map(([Icon, text]) => (
                <li key={text}>
                    <Icon aria-hidden="true" />
                    <span>{text}</span>
                </li>
            ))}
        </ul>
    );
}

function ThingsToKnow() {
    return (
        <section className="information-section things-section">
            <h2>Things to know</h2>

            <div className="things-to-know">
                <div>
                    <h3>House Rules</h3>
                    <InformationList items={houseRules} />
                </div>

                <div>
                    <h3>Health &amp; Safety</h3>
                    <InformationList items={safetyItems} />
                    <button className="things-more-button" type="button">
                        Show more
                    </button>
                </div>

                <div>
                    <h3>Cancellation Policy</h3>
                    <ul className="things-list">
                        <li>
                            <FaCalendarTimes aria-hidden="true" />
                            <span>Free cancellation before check-in</span>
                        </li>
                    </ul>
                    <button className="things-more-button" type="button">
                        Show more
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ThingsToKnow;
