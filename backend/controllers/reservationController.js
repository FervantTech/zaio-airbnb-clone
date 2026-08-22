const mongoose = require("mongoose");
const Accommodation = require("../models/Accommodation");
const Reservation = require("../models/Reservation");

async function createReservation(req, res) {
    try {
        const {
            accommodationId,
            checkIn,
            checkOut,
            guests,
        } = req.body;

        if (
            !accommodationId ||
            !checkIn ||
            !checkOut ||
            !guests
        ) {
            return res.status(400).json({
                message:
                    "Accommodation, dates and guest count are required",
            });
        }

        if (!mongoose.isValidObjectId(accommodationId)) {
            return res.status(400).json({
                message: "Invalid accommodation ID",
            });
        }

        const accommodation = await Accommodation.findById(
            accommodationId
        );

        if (!accommodation) {
            return res.status(404).json({
                message: "Accommodation not found",
            });
        }

        if (Number(guests) > accommodation.guests) {
            return res.status(400).json({
                message: `This property allows a maximum of ${accommodation.guests} guests`,
            });
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const difference = endDate - startDate;
        const nights = difference / (1000 * 60 * 60 * 24);

        if (
            Number.isNaN(startDate.getTime()) ||
            Number.isNaN(endDate.getTime()) ||
            nights < 1
        ) {
            return res.status(400).json({
                message: "Enter valid reservation dates",
            });
        }

        const accommodationCost = accommodation.price * nights;

        const discount =
            nights >= 7
                ? accommodationCost *
                  (accommodation.weeklyDiscount / 100)
                : 0;

        const total =
            accommodationCost -
            discount +
            accommodation.cleaningFee +
            accommodation.serviceFee +
            accommodation.occupancyTaxes;

        const reservation = await Reservation.create({
            accommodation: accommodation._id,
            user: req.user._id,
            host: accommodation.hostId,
            checkIn: startDate,
            checkOut: endDate,
            guests: Number(guests),
            nights,
            total,
        });

        const populatedReservation = await reservation.populate([
            {
                path: "accommodation",
                select: "title location images",
            },
            {
                path: "user",
                select: "username email",
            },
        ]);

        res.status(201).json(populatedReservation);
    } catch (error) {
        res.status(400).json({
            message: "Could not create reservation",
            error: error.message,
        });
    }
}

async function getHostReservations(req, res) {
    try {
        const reservations = await Reservation.find({
            host: req.user._id,
        })
            .populate("accommodation", "title location images")
            .populate("user", "username email")
            .sort({ createdAt: -1 });

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: "Could not load host reservations",
            error: error.message,
        });
    }
}

async function getUserReservations(req, res) {
    try {
        const reservations = await Reservation.find({
            user: req.user._id,
        })
            .populate("accommodation", "title location images")
            .sort({ createdAt: -1 });

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({
            message: "Could not load user reservations",
            error: error.message,
        });
    }
}

async function deleteReservation(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid reservation ID",
            });
        }

        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                message: "Reservation not found",
            });
        }

        const isCustomer =
            reservation.user.toString() === req.user._id.toString();

        const isHost =
            reservation.host.toString() === req.user._id.toString();

        const isAdmin = req.user.role === "admin";

        if (!isCustomer && !isHost && !isAdmin) {
            return res.status(403).json({
                message:
                    "You do not have permission to delete this reservation",
            });
        }

        await reservation.deleteOne();

        res.status(200).json({
            message: "Reservation deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not delete reservation",
            error: error.message,
        });
    }
}

module.exports = {
    createReservation,
    getHostReservations,
    getUserReservations,
    deleteReservation,
};