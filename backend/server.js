const { webcrypto } = require("node:crypto");

if (!globalThis.crypto) {
    globalThis.crypto = webcrypto;
}
const mongoose = require("mongoose");
const express = require("express");
const path = require("node:path");
const cors = require("cors");
const dotenv = require("dotenv");
const accommodationRoutes = require(
    "./routes/accommodationRoutes"
);
const userRoutes = require("./routes/userRoutes");
dotenv.config();
const reservationRoutes = require(
    "./routes/reservationRoutes"
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/api", (req, res) => {
    res.status(200).json({
        message: "Airbnb Clone API is running",
    });
});



const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
