import { useState } from "react";
import "../CSS/CostCalculator.css";

function CostCalculator({ accommodation }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guestCount, setGuestCount] = useState(1);

    function calculateNights() {
        if (!checkIn || !checkOut) {
            return 1;
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const difference = endDate - startDate;
        const nights = difference / (1000 * 60 * 60 * 24);

        return nights > 0 ? nights : 1;
    }

    function formatPrice(amount) {
        return `R${amount.toLocaleString()}`;
    }

    const nights = calculateNights();
    const accommodationCost = accommodation.price * nights;

    const discount =
        nights >= 7 ? accommodation.weeklyDiscount : 0;

    const total =
        accommodationCost -
        discount +
        accommodation.cleaningFee +
        accommodation.serviceFee +
        accommodation.occupancyTaxes;

    return (
        <aside className="cost-calculator">
            <div className="calculator-heading">
                <p>
                    <strong>{formatPrice(accommodation.price)}</strong> / night
                </p>

                <p>
                    ★ {accommodation.rating} · {accommodation.reviews} reviews
                </p>
            </div>

            <div className="booking-fields">
                <label>
                    Check-in
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(event) => setCheckIn(event.target.value)}
                    />
                </label>

                <label>
                    Check-out
                    <input
                        type="date"
                        value={checkOut}
                        min={checkIn}
                        onChange={(event) => setCheckOut(event.target.value)}
                    />
                </label>

                <label className="guest-field">
                    Guests
                    <select
                        value={guestCount}
                        onChange={(event) =>
                            setGuestCount(Number(event.target.value))
                        }
                    >
                        {[1, 2, 3, 4].map((guest) => (
                            <option value={guest} key={guest}>
                                {guest} {guest === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <button className="reserve-button" type="button">
                Reserve
            </button>

            <p className="charge-message">You won’t be charged yet</p>

            <div className="cost-breakdown">
                <div>
                    <span>
                        {formatPrice(accommodation.price)} × {nights} nights
                    </span>
                    <span>{formatPrice(accommodationCost)}</span>
                </div>

                {discount > 0 && (
                    <div className="discount">
                        <span>Weekly discount</span>
                        <span>-{formatPrice(discount)}</span>
                    </div>
                )}

                <div>
                    <span>Cleaning fee</span>
                    <span>{formatPrice(accommodation.cleaningFee)}</span>
                </div>

                <div>
                    <span>Service fee</span>
                    <span>{formatPrice(accommodation.serviceFee)}</span>
                </div>

                <div>
                    <span>Occupancy taxes and fees</span>
                    <span>{formatPrice(accommodation.occupancyTaxes)}</span>
                </div>
            </div>

            <div className="calculator-total">
                <strong>Total</strong>
                <strong>{formatPrice(total)}</strong>
            </div>
        </aside>
    );
}

export default CostCalculator;