const fs = require("node:fs");
const path = require("node:path");
const multer = require("multer");

const uploadDirectory = path.join(__dirname, "../uploads");

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadDirectory);
    },
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${extension}`;

        callback(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5,
    },
    fileFilter: function (req, file, callback) {
        if (!file.mimetype.startsWith("image/")) {
            return callback(new Error("Only image files are allowed"));
        }

        callback(null, true);
    },
});

function uploadImages(req, res, next) {
    upload.array("images", 5)(req, res, function (error) {
        if (error) {
            return res.status(400).json({
                message:
                    error.code === "LIMIT_FILE_SIZE"
                        ? "Each image must be smaller than 5MB"
                        : error.message,
            });
        }

        next();
    });
}

module.exports = uploadImages;
