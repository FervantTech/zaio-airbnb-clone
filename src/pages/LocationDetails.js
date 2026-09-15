import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import API_URL from "../config/api";
import getImageUrl from "../utils/imageUrl";
import AccommodationInfo from "../components/AccommodationInfo";
import CostCalculator from "../components/CostCalculator";
import "../CSS/LocationDetails.css";

function LocationDetails() {
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [accommodation, setAccommodation] = useState(null);
    const [checkIn, setCheckIn] = useState(
        searchParams.get("checkIn") || ""
    );
    const [checkOut, setCheckOut] = useState(
        searchParams.get("checkOut") || ""
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const updatedSearchParams = new URLSearchParams(location.search);
        setCheckIn(updatedSearchParams.get("checkIn") || "");
        setCheckOut(updatedSearchParams.get("checkOut") || "");
    }, [location.search]);

    useEffect(() => {
        async function loadAccommodation() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/accommodations/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Could not load accommodation"
                    );
                }

                setAccommodation(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadAccommodation();
    }, [id]);

    if (loading) {
        return (
            <main className="location-details">
                <p>Loading accommodation...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="location-details">
                <p className="page-error">{error}</p>
            </main>
        );
    }

    return (
        <main className="location-details">
            <section className="details-heading">
                <h1>{accommodation.title}</h1>

                <p>
                    ★ {accommodation.rating} ·{" "}
                    {accommodation.reviews} reviews ·{" "}
                    {accommodation.location}
                </p>
            </section>

            <section className="image-gallery">
                <img
                    className="gallery-main-image"
                    src={getImageUrl(accommodation.images[0])}
                    alt={accommodation.title}
                />

                {accommodation.images.slice(1, 5).map((image, index) => (
                    <img
                        src={getImageUrl(image)}
                        alt={`${accommodation.title} view ${index + 2}`}
                        key={image}
                    />
                ))}
            </section>

            <section className="details-layout">
                <AccommodationInfo
                    accommodation={accommodation}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onClearDates={() => {
                        setCheckIn("");
                        setCheckOut("");
                    }}
                />
                <CostCalculator
                    accommodation={accommodation}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    setCheckIn={setCheckIn}
                    setCheckOut={setCheckOut}
                />
            </section>
        </main>
    );
}

export default LocationDetails;
