const express = require("express");

const {
    getAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    deleteAccommodation,
} = require("../controllers/accommodationController");

const {
    protect,
    allowRoles,
} = require("../middleware/auth");

const router = express.Router();

router.get("/", getAccommodations);
router.get("/:id", getAccommodationById);

router.post(
    "/",
    protect,
    allowRoles("host", "admin"),
    createAccommodation
);
router.put(
    "/:id",
    protect,
    allowRoles("host", "admin"),
    updateAccommodation
);
router.delete(
    "/:id",
    protect,
    allowRoles("host", "admin"),
    deleteAccommodation
);

module.exports = router;