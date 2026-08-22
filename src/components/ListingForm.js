import { useState } from "react";
import "../CSS/ListingForm.css";

const emptyListing = {
    title: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    type: "",
    price: "",
    amenities: "",
    weeklyDiscount: "",
    cleaningFee: "",
    serviceFee: "",
    occupancyTaxes: "",
};

function ListingForm({
    initialListing = emptyListing,
    buttonText,
    onSubmit,
}) {
    const [formData, setFormData] = useState(initialListing);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleImages(event) {
        setImages(Array.from(event.target.files));
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (!formData.location) {
            newErrors.location = "Location is required.";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required.";
        }

        if (!formData.type.trim()) {
            newErrors.type = "Accommodation type is required.";
        }

        if (Number(formData.guests) < 1) {
            newErrors.guests = "At least one guest is required.";
        }

        if (Number(formData.bedrooms) < 1) {
            newErrors.bedrooms = "At least one bedroom is required.";
        }

        if (Number(formData.bathrooms) < 1) {
            newErrors.bathrooms = "At least one bathroom is required.";
        }

        if (Number(formData.price) <= 0) {
            newErrors.price = "Enter a valid price.";
        }

        return newErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        onSubmit({
            ...formData,
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            guests: Number(formData.guests),
            price: Number(formData.price),
            weeklyDiscount: Number(formData.weeklyDiscount),
            cleaningFee: Number(formData.cleaningFee),
            serviceFee: Number(formData.serviceFee),
            occupancyTaxes: Number(formData.occupancyTaxes),
            amenities: formData.amenities
                .split(",")
                .map((amenity) => amenity.trim())
                .filter(Boolean),
            images,
        });
    }

    function showError(field) {
        return errors[field] && (
            <p className="listing-form-error">{errors[field]}</p>
        );
    }

    return (
        <form className="listing-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
                <label htmlFor="title">Listing title</label>
                <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                {showError("title")}
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                >
                    <option value="">Select a location</option>
                    <option value="Cape Town">Cape Town</option>
                    <option value="Johannesburg">Johannesburg</option>
                    <option value="Durban">Durban</option>
                    <option value="Pretoria">Pretoria</option>
                </select>
                {showError("location")}
            </div>

            <div className="form-group">
                <label htmlFor="type">Accommodation type</label>
                <input
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="Entire apartment"
                />
                {showError("type")}
            </div>

            <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                />
                {showError("description")}
            </div>

            {["guests", "bedrooms", "bathrooms", "price"].map((field) => (
                <div className="form-group" key={field}>
                    <label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                        id={field}
                        name={field}
                        type="number"
                        min="1"
                        value={formData[field]}
                        onChange={handleChange}
                    />
                    {showError(field)}
                </div>
            ))}

            <div className="form-group full-width">
                <label htmlFor="amenities">
                    Amenities separated by commas
                </label>
                <input
                    id="amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    placeholder="Wifi, Kitchen, Free parking"
                />
            </div>

            {[
                "weeklyDiscount",
                "cleaningFee",
                "serviceFee",
                "occupancyTaxes",
            ].map((field) => (
                <div className="form-group" key={field}>
                    <label htmlFor={field}>
                        {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                        id={field}
                        name={field}
                        type="number"
                        min="0"
                        value={formData[field]}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div className="form-group full-width">
                <label htmlFor="images">Property images</label>
                <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImages}
                />

                {images.length > 0 && (
                    <p>{images.length} images selected</p>
                )}
            </div>

            <button className="listing-submit-button" type="submit">
                {buttonText}
            </button>
        </form>
    );
}

export default ListingForm;