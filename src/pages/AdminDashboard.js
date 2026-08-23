import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import getImageUrl from "../utils/imageUrl";
import AdminNavigation from "../components/AdminNavigation";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
    const [listings, setListings] = useState([]);
    const [reservationCount, setReservationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadListings() {
            try {
                const token = localStorage.getItem("token");

                const [listingsResponse, reservationsResponse] =
                    await Promise.all([
                        fetch(`${API_URL}/accommodations`),
                        fetch(`${API_URL}/reservations/host`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                    ]);

                const listingsData = await listingsResponse.json();
                const reservationsData =
                    await reservationsResponse.json();

                if (!listingsResponse.ok) {
                    throw new Error(
                        listingsData.message || "Could not load listings"
                    );
                }

                if (!reservationsResponse.ok) {
                    throw new Error(
                        reservationsData.message ||
                            "Could not load reservations"
                    );
                }

                setListings(listingsData);
                setReservationCount(reservationsData.length);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadListings();
    }, []);

    async function handleDelete(id) {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (!shouldDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/accommodations/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Could not delete listing"
                );
            }

            setListings(
                listings.filter((listing) => listing._id !== id)
            );
        } catch (error) {
            setError(error.message);
        }
    }

    const locationCount = new Set(
        listings.map((listing) => listing.location)
    ).size;

    return (
        <>
            <AdminNavigation />

            <main className="admin-dashboard">
            <section className="admin-heading">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Manage your Airbnb property listings.</p>
                </div>

                <Link className="create-listing-button" to="/admin/create">
                    Create listing
                </Link>
            </section>

            {error && <p className="page-error">{error}</p>}
            {loading && <p>Loading listings...</p>}

            {!loading && (
                <>
                    <section className="dashboard-summary">
                        <article>
                            <h2>{listings.length}</h2>
                            <p>Total listings</p>
                        </article>

                        <article>
                            <h2>{reservationCount}</h2>
                            <p>Reservations</p>
                        </article>

                        <article>
                            <h2>{locationCount}</h2>
                            <p>Locations</p>
                        </article>
                    </section>

                    <section className="admin-listings">
                        <h2>Your listings</h2>

                        {listings.length === 0 && (
                            <p>You have not created any listings yet.</p>
                        )}

                        <div className="admin-listing-grid">
                            {listings.map((listing) => (
                                <article
                                    className="admin-listing-card"
                                    key={listing._id}
                                >
                                    <img
                                        className="admin-listing-image"
                                        src={getImageUrl(listing.images[0])}
                                        alt={listing.title}
                                    />

                                    <div className="admin-listing-details">
                                        <p className="admin-listing-type">
                                            {listing.type}
                                        </p>

                                        <h3>{listing.title}</h3>

                                        <p className="admin-listing-location">
                                            {listing.location}
                                        </p>

                                        <p className="admin-listing-features">
                                            {listing.guests} guests ·{" "}
                                            {listing.bedrooms} bedrooms ·{" "}
                                            {listing.bathrooms} bathrooms
                                        </p>

                                        <p className="admin-listing-amenities">
                                            {listing.amenities
                                                .slice(0, 3)
                                                .join(" · ")}
                                        </p>

                                        <div className="admin-listing-bottom">
                                            <p>
                                                <strong>
                                                    ★ {listing.rating}
                                                </strong>{" "}
                                                ({listing.reviews} reviews)
                                            </p>

                                            <p className="admin-listing-price">
                                                <strong>
                                                    R
                                                    {listing.price.toLocaleString()}
                                                </strong>{" "}
                                                / night
                                            </p>
                                        </div>

                                        <div className="listing-actions">
                                            <Link
                                                to={`/admin/update/${listing._id}`}
                                            >
                                                Update
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(listing._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </>
            )}
            </main>
        </>
    );
}

export default AdminDashboard;
