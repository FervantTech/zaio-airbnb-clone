import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_URL from "../config/api";
import LocationCard from "../components/LocationCard";

function Locations() {
    const [searchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") || "Cape Town";

    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAccommodations() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/accommodations?location=${encodeURIComponent(
                        selectedCity
                    )}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Could not load accommodations"
                    );
                }

                setAccommodations(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadAccommodations();
    }, [selectedCity]);

    return (
        <main>
            <section className="locations-page">
                {loading && <p>Loading accommodations...</p>}

                {error && <p className="page-error">{error}</p>}

                {!loading && !error && (
                    <>
                        <p>{accommodations.length} accommodations</p>
                        <h1>Stays in {selectedCity}</h1>

                        {accommodations.length === 0 ? (
                            <p>
                                No accommodations are currently available in{" "}
                                {selectedCity}.
                            </p>
                        ) : (
                            accommodations.map((accommodation) => (
                                <LocationCard
                                    key={accommodation._id}
                                    accommodation={accommodation}
                                />
                            ))
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

export default Locations;
