import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import getImageUrl from "../utils/imageUrl";
import AdminNavigation from "../components/AdminNavigation";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadListings() {
            try {
                const listingsResponse = await fetch(
                    `${API_URL}/accommodations`
                );

                const listingsData = await listingsResponse.json();

                if (!listingsResponse.ok) {
                    throw new Error(
                        listingsData.message || "Could not load listings"
                    );
                }

                setListings(listingsData);
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

    return (
        <>
            <AdminNavigation />

            <main className="admin-dashboard">
            {error && <p className="page-error">{error}</p>}
            {loading && <p>Loading listings...</p>}

            {!loading && (
                <>
                    <section className="admin-listings">
                        <h1>My Hotel List</h1>
                        {listings.length === 0 && (
                            <p>You have not created any listings yet.</p>
                        )}

                        <div className="admin-listing-grid">
                            {listings.map((listing) => (
                                <article
                                    className="admin-listing-card"
                                    key={listing._id}
                                >
                                    <div className="admin-listing-media">
                                        <img
                                            className="admin-listing-image"
                                            src={getImageUrl(listing.images[0])}
                                            alt={listing.title}
                                        />

                                        <div className="listing-actions">
                                            <Link to={`/admin/update/${listing._id}`}>
                                                Update
                                            </Link>
                                            <button type="button" onClick={() => handleDelete(listing._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="admin-listing-details">
                                        <p className="admin-listing-type">
                                            {listing.type}
                                        </p>

                                        <h3>{listing.title}</h3>

                                        <p className="admin-listing-features">
                                            {listing.guests} guests · Entire Home · {listing.bedrooms} beds · {listing.bathrooms} bath
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
