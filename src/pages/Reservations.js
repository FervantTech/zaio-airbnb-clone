import "../CSS/Reservations.css";

const reservations = [
    {
        id: 1,
        accommodation: "Modern apartment near the waterfront",
        location: "Cape Town",
        checkIn: "2 September 2026",
        checkOut: "9 September 2026",
        guests: 2,
        total: 12105,
        status: "Confirmed",
    },
    {
        id: 2,
        accommodation: "Ocean-view apartment near the beach",
        location: "Durban",
        checkIn: "15 September 2026",
        checkOut: "18 September 2026",
        guests: 4,
        total: 7300,
        status: "Confirmed",
    },
];

function Reservations() {
    return (
        <main className="reservations-page">
            <h1>Your reservations</h1>
            <p>View and manage your upcoming stays.</p>

            <div className="reservations-table-wrapper">
                <table className="reservations-table">
                    <thead>
                        <tr>
                            <th>Accommodation</th>
                            <th>Location</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Guests</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.id}>
                                <td>{reservation.accommodation}</td>
                                <td>{reservation.location}</td>
                                <td>{reservation.checkIn}</td>
                                <td>{reservation.checkOut}</td>
                                <td>{reservation.guests}</td>
                                <td>
                                    R{reservation.total.toLocaleString()}
                                </td>
                                <td>
                                    <span className="reservation-status">
                                        {reservation.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default Reservations;