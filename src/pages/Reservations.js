import { useEffect, useState } from "react";
import API_URL from "../config/api";
import "../CSS/Reservations.css";

function Reservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const savedUser = localStorage.getItem("user");
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    const isHost =
        currentUser &&
        ["host", "admin"].includes(currentUser.role);

    useEffect(() => {
        async function loadReservations() {
            try {
                const token = localStorage.getItem("token");
                const endpoint = isHost ? "host" : "user";

                const response = await fetch(
                    `${API_URL}/reservations/${endpoint}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Could not load reservations"
                    );
                }

                setReservations(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadReservations();
    }, [isHost]);

    async function handleDelete(id) {
        const shouldDelete = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!shouldDelete) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/reservations/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Could not cancel reservation"
                );
            }

            setReservations(
                reservations.filter(
                    (reservation) => reservation._id !== id
                )
            );
        } catch (error) {
            setError(error.message);
        }
    }

    function formatDate(date) {
        return new Intl.DateTimeFormat("en-ZA", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    }

    return (
        <main className="reservations-page">
            <h1>
                {isHost ? "Guest reservations" : "Your reservations"}
            </h1>

            <p>
                {isHost
                    ? "View reservations made for your properties."
                    : "View and manage your upcoming stays."}
            </p>

            {loading && <p>Loading reservations...</p>}
            {error && <p className="page-error">{error}</p>}

            {!loading && !error && reservations.length === 0 && (
                <p>No reservations found.</p>
            )}

            {!loading && reservations.length > 0 && (
                <div className="reservations-table-wrapper">
                    <table className="reservations-table">
                        <thead>
                            <tr>
                                <th>Accommodation</th>
                                <th>Location</th>

                                {isHost && <th>Customer</th>}

                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Guests</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservations.map((reservation) => (
                                <tr key={reservation._id}>
                                    <td>
                                        {reservation.accommodation?.title}
                                    </td>

                                    <td>
                                        {reservation.accommodation?.location}
                                    </td>

                                    {isHost && (
                                        <td>
                                            {reservation.user?.username}
                                        </td>
                                    )}

                                    <td>
                                        {formatDate(reservation.checkIn)}
                                    </td>

                                    <td>
                                        {formatDate(reservation.checkOut)}
                                    </td>

                                    <td>{reservation.guests}</td>

                                    <td>
                                        R{reservation.total.toLocaleString()}
                                    </td>

                                    <td>
                                        <span className="reservation-status">
                                            {reservation.status}
                                        </span>
                                    </td>

                                    <td>
                                        <button
                                            className="cancel-reservation"
                                            type="button"
                                            onClick={() =>
                                                handleDelete(reservation._id)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default Reservations;