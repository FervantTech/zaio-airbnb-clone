const express = require("express");

const {
    createReservation,
    getHostReservations,
    getUserReservations,
    deleteReservation,
} = require("../controllers/reservationController");

const {
    protect,
    allowRoles,
} = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createReservation);

router.get(
    "/host",
    protect,
    allowRoles("host", "admin"),
    getHostReservations
);

router.get("/user", protect, getUserReservations);

router.delete("/:id", protect, deleteReservation);

module.exports = router;