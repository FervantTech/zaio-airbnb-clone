import API_URL from "../config/api";

function getImageUrl(image) {
    if (!image) {
        return "";
    }

    if (image.startsWith("http")) {
        return image;
    }

    if (image.startsWith("/uploads/")) {
        const serverUrl = API_URL.replace(/\/api\/?$/, "");

        return `${serverUrl}${image}`;
    }

    return `/images/${image}`;
}

export default getImageUrl;
