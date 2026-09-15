import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API_URL from "../config/api";
import LocationCard from "../components/LocationCard";

function Locations() {
    const [searchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") || "";
    const selectedGuests = Number(searchParams.get("guests")) || 1;

    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAccommodations() {
            try {
                setLoading(true);
                setError("");

                const requestParams = new URLSearchParams({
                    guests: String(selectedGuests),
                });

                if (selectedCity) {
                    requestParams.set("location", selectedCity);
                }

                const endpoint = `${API_URL}/accommodations?${requestParams.toString()}`;

                const response = await fetch(endpoint);

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
    }, [selectedCity, selectedGuests]);

    return (
        <main>
            <section className="locations-page">
                {loading && <p>Loading accommodations...</p>}

                {error && <p className="page-error">{error}</p>}

                {!loading && !error && (
                    <>
                        <p>
                            {accommodations.length}{" "}
                            {accommodations.length === 1
                                ? "accommodation"
                                : "accommodations"}
                        </p>
                        <h1>
                            Stays in {selectedCity || "all locations"}
                        </h1>

                        {accommodations.length === 0 ? (
                            <p>
                                No accommodations are currently available in{" "}
                                {selectedCity || "all locations"}.
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
