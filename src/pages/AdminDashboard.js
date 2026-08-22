import { useState } from "react";
import { Link } from "react-router-dom";
import accommodations from "../data/accommodations";
import "../CSS/AdminDashboard.css";

function AdminDashboard() {
    const [listings, setListings] = useState(accommodations);

    function handleDelete(id) {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete this listing?"
        );

        if (shouldDelete) {
            setListings(
                listings.filter((listing) => listing.id !== id)
            );
        }
    }

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

            <section className="dashboard-summary">
                <article>
                    <h2>{listings.length}</h2>
                    <p>Total listings</p>
                </article>

                <article>
                    <h2>2</h2>
                    <p>Reservations</p>
                </article>

                <article>
                    <h2>4</h2>
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
                                <tr key={listing.id}>
                                    <td>
                                        <img
                                            src={listing.image}
                                            alt={listing.title}
                                        />
                                    </td>

                                    <td>{listing.title}</td>
                                    <td>{listing.location}</td>
                                    <td>
                                        R{listing.price.toLocaleString()} / night
                                    </td>

                                    <td>
                                        <div className="listing-actions">
                                            <Link
                                                to={`/admin/update/${listing.id}`}
                                            >
                                                Update
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(listing.id)
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
        </main>
    );
}

export default AdminDashboard;