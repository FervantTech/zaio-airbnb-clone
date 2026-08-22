const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        accommodation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accommodation",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        checkIn: {
            type: Date,
            required: true,
        },
        checkOut: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.checkIn;
                },
                message: "Check-out must be after check-in",
            },
        },
        guests: {
            type: Number,
            required: true,
            min: 1,
        },
        nights: {
            type: Number,
            required: true,
            min: 1,
        },
        total: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["confirmed", "cancelled"],
            default: "confirmed",
        },
    },
    {
        timestamps: true,
    }
);

reservationSchema.index({ user: 1 });
reservationSchema.index({ host: 1 });

module.exports = mongoose.model(
    "Reservation",
    reservationSchema
);