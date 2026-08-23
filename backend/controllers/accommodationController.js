const mongoose = require("mongoose");
const Accommodation = require("../models/Accommodation");

function prepareAccommodationData(body) {
    const accommodationData = {
        ...body,
    };

    if (typeof accommodationData.amenities === "string") {
        try {
            accommodationData.amenities = JSON.parse(
                accommodationData.amenities
            );
        } catch (error) {
            accommodationData.amenities = accommodationData.amenities
                .split(",")
                .map((amenity) => amenity.trim())
                .filter(Boolean);
        }
    }

    return accommodationData;
}

function getUploadedImagePaths(files = []) {
    return files.map((file) => `/uploads/${file.filename}`);
}

async function getAccommodations(req, res) {
    try {
        const filter = {};

        if (req.query.location) {
            filter.location = req.query.location;
        }

        const accommodations = await Accommodation.find(filter);

        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({
            message: "Could not load accommodations",
            error: error.message,
        });
    }
}

async function getAccommodationById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid accommodation ID",
            });
        }

        const accommodation = await Accommodation.findById(req.params.id);

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found",
            });
        }

        res.status(200).json(accommodation);
    } catch (error) {
        res.status(500).json({
            message: "Could not load accommodation",
            error: error.message,
        });
    }
}

async function createAccommodation(req, res) {
    try {
        const accommodationData = prepareAccommodationData(req.body);
        const uploadedImages = getUploadedImagePaths(req.files);

        if (uploadedImages.length === 0) {
            return res.status(400).json({
                message: "At least one property image is required",
            });
        }

        const accommodation = await Accommodation.create({
            ...accommodationData,
            images: uploadedImages,
            host: accommodationData.host || req.user.username,
            hostId: req.user._id,
        });

        res.status(201).json(accommodation);
    } catch (error) {
        res.status(400).json({
            message: "Could not create accommodation",
            error: error.message,
        });
    }
}

async function updateAccommodation(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid accommodation ID",
            });
        }

        const updates = prepareAccommodationData(req.body);
        const uploadedImages = getUploadedImagePaths(req.files);

        if (uploadedImages.length > 0) {
            updates.images = uploadedImages;
        }

        delete updates.hostId;

        const accommodation = await Accommodation.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found",
            });
        }

        res.status(200).json(accommodation);
    } catch (error) {
        res.status(400).json({
            message: "Could not update accommodation",
            error: error.message,
        });
    }
}

async function deleteAccommodation(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid accommodation ID",
            });
        }

        const accommodation = await Accommodation.findByIdAndDelete(
            req.params.id
        );

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found",
            });
        }

        res.status(200).json({
            message: "Accommodation deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not delete accommodation",
            error: error.message,
        });
    }
}

module.exports = {
    getAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
};
