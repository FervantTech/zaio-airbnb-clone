function createListingFormData(listing) {
    const formData = new FormData();

    Object.entries(listing).forEach(([field, value]) => {
        if (field === "images") {
            value.forEach((image) => {
                formData.append("images", image);
            });
        } else if (field === "amenities") {
            formData.append(field, JSON.stringify(value));
        } else {
            formData.append(field, value);
        }
    });

    return formData;
}

export default createListingFormData;
