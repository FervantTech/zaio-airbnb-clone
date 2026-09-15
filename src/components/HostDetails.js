function HostDetails({ accommodation }) {
    const hostName = accommodation.host || "Host";
    const isSuperhost = accommodation.rating >= 4.8;

    return (
        <section className="information-section host-details-section">
            <div className="host-details-heading">
                <span className="host-avatar">{hostName.charAt(0)}</span>
                <div>
                    <h2>Hosted by {hostName}</h2>
                    <p>Joined in 2022</p>
                </div>
            </div>

            <div className="host-badges">
                <span>★ {accommodation.reviews} reviews</span>
                <span>✓ Identity verified</span>
                {isSuperhost && <span>♙ Superhost</span>}
            </div>

            {isSuperhost && <h3>{hostName} is a Superhost</h3>}

            <p>
                {accommodation.hostDescription ||
                    "An experienced host committed to providing guests with a comfortable stay."}
            </p>
            <p>Response rate: 100%</p>
            <p>Response time: within an hour</p>

            <button className="contact-host-button" type="button">
                Contact Host
            </button>

            <p className="payment-safety-note">
                <span aria-hidden="true">🛡️</span>
                To protect your payment, never transfer money or communicate
                outside of the Airbnb website or app.
            </p>
        </section>
    );
}

export default HostDetails;
