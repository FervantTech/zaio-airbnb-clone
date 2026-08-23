import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import ListingForm from "../components/ListingForm";
import AdminNavigation from "../components/AdminNavigation";
import "../CSS/ListingPage.css";

function CreateListing() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleCreate(listing) {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const listingData = {
                ...listing,
                images: listing.images.map((image) => image.name),
            };

            const response = await fetch(
                `${API_URL}/accommodations`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(listingData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Could not create listing"
                );
            }

            alert("Listing created successfully.");
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <AdminNavigation />

            <main className="listing-page">
            <div className="listing-page-heading">
                <h1>Create a new listing</h1>
                <p>Enter the property’s information below.</p>
            </div>

            {error && <p className="page-error">{error}</p>}

            <ListingForm
                buttonText={
                    loading ? "Creating listing..." : "Create listing"
                }
                onSubmit={handleCreate}
            />
            </main>
        </>
    );
}

export default CreateListing;
