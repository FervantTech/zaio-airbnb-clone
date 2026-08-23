import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";
import "../CSS/CostCalculator.css";

function CostCalculator({ accommodation }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
    nights >= 7 ? accommodationCost * (accommodation.weeklyDiscount / 100) : 0;

  const total =
    accommodationCost -
    discount +
    accommodation.cleaningFee +
    accommodation.serviceFee +
    accommodation.occupancyTaxes;

  async function handleReserve() {
    if (!checkIn || !checkOut) {
      setError("Select your check-in and check-out dates.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          accommodationId: accommodation._id,
          checkIn,
          checkOut,
          guests: guestCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create reservation");
      }

      setSuccess("Reservation confirmed successfully.");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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
            onChange={(event) => setGuestCount(Number(event.target.value))}
          >
            {Array.from(
              { length: accommodation.guests },
              (_, index) => index + 1,
            ).map((guest) => (
              <option value={guest} key={guest}>
                {guest} {guest === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        className="reserve-button"
        type="button"
        onClick={handleReserve}
        disabled={loading}
      >
        {loading ? "Reserving..." : "Reserve"}
      </button>
      {error && <p className="reservation-error">{error}</p>}

      {success && <p className="reservation-success">{success}</p>}

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
            <span>Weekly discount ({accommodation.weeklyDiscount}%)</span>
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
