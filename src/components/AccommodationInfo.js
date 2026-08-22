import "../CSS/AccommodationInfo.css";

function AccommodationInfo({ accommodation }) {
    return (
        <div className="accommodation-info">
            <section className="host-summary">
                <h2>{accommodation.type}</h2>

                <p>
                    {accommodation.guests} guests · {accommodation.bedrooms} bedrooms
                    · {accommodation.bathrooms} bathrooms
                </p>
            </section>

            <section className="information-section">
                <h2>Hosted by {accommodation.host}</h2>
                <p>{accommodation.hostDescription}</p>
            </section>

            <section className="information-section">
                <h2>About this place</h2>
                <p>{accommodation.description}</p>
            </section>

            <section className="information-section">
                <h2>Where you’ll sleep</h2>
                <div className="bedroom-card">
                    <h3>Bedroom</h3>
                    <p>1 queen bed</p>
                </div>
            </section>

            <section className="information-section">
                <h2>What this place offers</h2>

                <ul className="amenities-list">
                    {accommodation.amenities.map((amenity) => (
                        <li key={amenity}>{amenity}</li>
                    ))}

                    {accommodation.enhancedCleaning && (
                        <li>Enhanced cleaning</li>
                    )}

                    {accommodation.selfCheckIn && <li>Self check-in</li>}
                </ul>
            </section>

            <section className="information-section">
                <h2>Reviews</h2>
                <p>
                    ★ {accommodation.rating} from {accommodation.reviews} reviews
                </p>
            </section>

            <section className="information-section">
                <h2>Things to know</h2>

                <div className="things-to-know">
                    <div>
                        <h3>House rules</h3>
                        <p>Check-in after 14:00</p>
                        <p>No smoking</p>
                    </div>

                    <div>
                        <h3>Health and safety</h3>
                        <p>Safety equipment is available.</p>
                        <p>Follow the property’s safety guidelines.</p>
                    </div>

                    <div>
                        <h3>Cancellation policy</h3>
                        <p>Review the cancellation rules before booking.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AccommodationInfo;
