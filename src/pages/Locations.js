import { useSearchParams } from "react-router-dom";
import LocationFilter from "../components/LocationFilter";
import LocationCard from "../components/LocationCard";
import accommodations from "../data/accommodations";

function Locations() {
    const [searchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") || "Cape Town";

    const filteredAccommodations = accommodations.filter(
        (accommodation) => accommodation.location === selectedCity
    );

    return (
        <main>
            <LocationFilter />

            <section className="locations-page">
                <p>{filteredAccommodations.length} accommodations</p>
                <h1>Stays in {selectedCity}</h1>

                <div>
                    {filteredAccommodations.map((accommodation) => (
                        <LocationCard
                            key={accommodation.id}
                            accommodation={accommodation}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Locations;