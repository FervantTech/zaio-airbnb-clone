import { useNavigate } from "react-router-dom";
import ListingForm from "../components/ListingForm";
import "../CSS/ListingPage.css";

function CreateListing() {
    const navigate = useNavigate();

    function handleCreate(listing) {
        console.log("New listing:", listing);

        alert("Listing created successfully.");
        navigate("/admin");
    }

    return (
        <main className="listing-page">
            <div className="listing-page-heading">
                <h1>Create a new listing</h1>
                <p>Enter the property’s information below.</p>
            </div>

            <ListingForm
                buttonText="Create listing"
                onSubmit={handleCreate}
            />
        </main>
    );
}

export default CreateListing;