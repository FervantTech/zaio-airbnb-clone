function getImageUrl(image) {
    if (!image) {
        return "";
    }

    if (image.startsWith("http")) {
        return image;
    }

    return `/images/${image}`;
}

export default getImageUrl;