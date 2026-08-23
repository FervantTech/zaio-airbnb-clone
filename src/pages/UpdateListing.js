import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../config/api";
import ListingForm from "../components/ListingForm";
import AdminNavigation from "../components/AdminNavigation";
import "../CSS/ListingPage.css";

function UpdateListing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAccommodation() {
            try {
                const response = await fetch(
                    `${API_URL}/accommodations/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Could not load listing"
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

    async function handleUpdate(updatedListing) {
        try {
            setSaving(true);
            setError("");

            const token = localStorage.getItem("token");

            const listingData = {
                ...updatedListing,
                images:
                    updatedListing.images.length > 0
                        ? updatedListing.images.map(
                              (image) => image.name
                          )
                        : accommodation.images,
            };

            const response = await fetch(
                `${API_URL}/accommodations/${id}`,
                {
                    method: "PUT",
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
                    data.message || "Could not update listing"
                );
            }

            alert("Listing updated successfully.");
            navigate("/admin");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <>
                <AdminNavigation />
                <main className="listing-page">
                    <p>Loading listing...</p>
                </main>
            </>
        );
    }

    if (!accommodation) {
        return (
            <>
                <AdminNavigation />
                <main className="listing-page">
                    <p className="page-error">
                        {error || "Listing not found"}
                    </p>
                </main>
            </>
        );
    }

    const initialListing = {
        title: accommodation.title,
        location: accommodation.location,
        description: accommodation.description,
        bedrooms: accommodation.bedrooms,
        bathrooms: accommodation.bathrooms,
        guests: accommodation.guests,
        type: accommodation.type,
        price: accommodation.price,
        amenities: accommodation.amenities.join(", "),
        weeklyDiscount: accommodation.weeklyDiscount,
        cleaningFee: accommodation.cleaningFee,
        serviceFee: accommodation.serviceFee,
        occupancyTaxes: accommodation.occupancyTaxes,
    };

    return (
        <>
            <AdminNavigation />

            <main className="listing-page">
            <div className="listing-page-heading">
                <h1>Update listing</h1>
                <p>Edit the property’s information below.</p>
            </div>

            {error && <p className="page-error">{error}</p>}

            <ListingForm
                initialListing={initialListing}
                buttonText={
                    saving ? "Saving changes..." : "Save changes"
                }
                onSubmit={handleUpdate}
            />
            </main>
        </>
    );
}

export default UpdateListing;
