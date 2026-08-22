import { useParams } from "react-router-dom";
import accommodations from "../data/accommodations";
import "../CSS/LocationDetails.css";
import AccommodationInfo from "../components/AccommodationInfo";
import CostCalculator from "../components/CostCalculator";

function LocationDetails() {
    const { id } = useParams();

    const accommodation = accommodations.find(
        (item) => item.id === Number(id)
    );

    if (!accommodation) {
        return (
            <main className="location-details">
                <h1>Accommodation not found</h1>
            </main>
        );
    }

    return (
        <main className="location-details">
            <section className="details-heading">
                <h1>{accommodation.title}</h1>

                <p>
                    ★ {accommodation.rating} · {accommodation.reviews} reviews ·{" "}
                    {accommodation.location}
                </p>
            </section>

            <section className="image-gallery">
                <img
                    className="gallery-main-image"
                    src={accommodation.images[0]}
                    alt={accommodation.title}
                />

                {accommodation.images.slice(1, 5).map((image, index) => (
                    <img
                        src={image}
                        alt={`${accommodation.title} view ${index + 2}`}
                        key={index}
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