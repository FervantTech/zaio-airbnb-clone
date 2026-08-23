import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../config/api";
import getImageUrl from "../utils/imageUrl";
import AccommodationInfo from "../components/AccommodationInfo";
import CostCalculator from "../components/CostCalculator";
import "../CSS/LocationDetails.css";

function LocationDetails() {
    const { id } = useParams();

    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                <AccommodationInfo accommodation={accommodation} />
                <CostCalculator accommodation={accommodation} />
            </section>
        </main>
    );
}

export default LocationDetails;