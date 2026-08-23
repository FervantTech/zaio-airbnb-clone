import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import getImageUrl from "../utils/imageUrl";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadListings() {
            try {
                const response = await fetch(
                    `${API_URL}/accommodations`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Could not load listings"
                    );
                }

                setListings(data);
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
                            <h2>1</h2>
                            <p>Reservations</p>
                        </article>

                        <article>
                            <h2>{locationCount}</h2>
                            <p>Locations</p>
                        </article>
                    </section>

                    <section className="admin-listings">
                        <h2>Your listings</h2>

                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {listings.map((listing) => (
                                        <tr key={listing._id}>
                                            <td>
                                                <img
                                                    src={getImageUrl(
                                                        listing.images[0]
                                                    )}
                                                    alt={listing.title}
                                                />
                                            </td>

                                            <td>{listing.title}</td>
                                            <td>{listing.location}</td>
                                            <td>
                                                R
                                                {listing.price.toLocaleString()}{" "}
                                                / night
                                            </td>

                                            <td>
                                                <div className="listing-actions">
                                                    <Link
                                                        to={`/admin/update/${listing._id}`}
                                                    >
                                                        Update
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                listing._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}

export default AdminDashboard;