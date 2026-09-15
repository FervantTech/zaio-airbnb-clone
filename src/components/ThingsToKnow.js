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
    { Icon: FaClock, text: "Check-in: After 4:00 PM" },
    { Icon: FaClock, text: "Check-out: 10:00 AM" },
    { Icon: FaDoorOpen, text: "Self check-in with lock-box" },
    { Icon: FaBaby, text: "Not suitable for infants (under 2 years)" },
    { Icon: FaSmokingBan, text: "No smoking" },
    { Icon: FaPaw, text: "No pets" },
    { Icon: FaGlassCheers, text: "No parties or events" },
];

const safetyItems = [
    { Icon: FaBroom, text: "Committed to Airbnb’s enhanced cleaning process." },
    { Icon: FaUsers, text: "Airbnb’s social-distancing and other safety guidelines apply" },
    { Icon: FaVolumeMute, text: "Carbon monoxide alarm" },
    { Icon: FaShieldAlt, text: "Smoke alarm" },
    { Icon: FaExclamationTriangle, text: "Security deposit may apply if you damage the home" },
];

function InformationList({ items }) {
    return (
        <ul className="things-list">
            {items.map((item) => (
                <li key={item.text}>
                    <item.Icon aria-hidden="true" />
                    <span>{item.text}</span>
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
