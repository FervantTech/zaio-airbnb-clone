import { useNavigate, useParams } from "react-router-dom";
import ListingForm from "../components/ListingForm";
import accommodations from "../data/accommodations";
import "../CSS/ListingPage.css";

function UpdateListing() {
    const { id } = useParams();
    const navigate = useNavigate();

    const accommodation = accommodations.find(
        (listing) => listing.id === Number(id)
    );

    if (!accommodation) {
        return (
            <main className="listing-page">
                <h1>Listing not found</h1>
            </main>
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

    function handleUpdate(updatedListing) {
        console.log("Updated listing:", updatedListing);

        alert("Listing updated successfully.");
        navigate("/admin");
    }

    return (
        <main className="listing-page">
            <div className="listing-page-heading">
                <h1>Update listing</h1>
                <p>Edit the property’s information below.</p>
            </div>

            <ListingForm
                initialListing={initialListing}
                buttonText="Save changes"
                onSubmit={handleUpdate}
            />
        </main>
    );
}

export default UpdateListing;