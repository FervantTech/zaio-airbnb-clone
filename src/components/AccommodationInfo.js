import "../CSS/AccommodationInfo.css";
import BookingCalendar from "./BookingCalendar";
import ReviewSection from "./ReviewSection";
import HostDetails from "./HostDetails";
import ThingsToKnow from "./ThingsToKnow";
import getImageUrl from "../utils/imageUrl";
import {
    FaBroom,
    FaDoorOpen,
    FaFireExtinguisher,
    FaParking,
    FaShieldAlt,
    FaSnowflake,
    FaSwimmingPool,
    FaTv,
    FaUtensils,
    FaWifi,
} from "react-icons/fa";

const staticAmenities = [
    [FaWifi, "Wifi"],
    [FaUtensils, "Kitchen"],
    [FaParking, "Free parking"],
    [FaSwimmingPool, "Pool"],
    [FaTv, "TV"],
    [FaSnowflake, "Air conditioning"],
    [FaBroom, "Enhanced cleaning"],
    [FaDoorOpen, "Self check-in"],
    [FaShieldAlt, "Security cameras on property"],
    [FaFireExtinguisher, "Fire extinguisher"],
];

function AccommodationInfo({
    accommodation,
    checkIn,
    checkOut,
    onClearDates,
}) {
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
                <h2>About this place</h2>
                <p>{accommodation.description}</p>
            </section>

            <section className="information-section">
                <h2>Where you’ll sleep</h2>
                <div className="bedroom-card">
                    <img
                        src={getImageUrl(
                            accommodation.images[1] || accommodation.images[0]
                        )}
                        alt={`Bedroom at ${accommodation.title}`}
                    />
                    <h3>Bedroom</h3>
                    <p>1 queen bed</p>
                </div>
            </section>

            <section className="information-section">
                <h2>What this place offers</h2>

                <ul className="amenities-list">
                    {staticAmenities.map(([Icon, amenity]) => (
                        <li key={amenity}>
                            <Icon aria-hidden="true" />
                            <span>{amenity}</span>
                        </li>
                    ))}
                </ul>

                <button className="show-amenities-button" type="button">
                    Show all 37 amenities
                </button>
            </section>

            <BookingCalendar
                location={accommodation.location}
                checkIn={checkIn}
                checkOut={checkOut}
                onClearDates={onClearDates}
            />

            <ReviewSection
                rating={accommodation.rating}
                reviewCount={accommodation.reviews}
            />

            <HostDetails accommodation={accommodation} />

            <ThingsToKnow />
        </div>
    );
}

export default AccommodationInfo;
