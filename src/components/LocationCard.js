import { Link } from "react-router-dom";
import getImageUrl from "../utils/imageUrl";
import "../CSS/LocationCard.css";

function LocationCard({ accommodation }) {
  return (
    <Link className="location-card" to={`/locations/${accommodation._id}`}>
      <img
    src={getImageUrl(accommodation.images[0])}
    alt={accommodation.title}
/>

      <div className="location-card-content">
        <p className="accommodation-type">
          {accommodation.type} in {accommodation.location}
        </p>

        <h2>{accommodation.title}</h2>

        <p className="amenities">{accommodation.amenities.join(" · ")}</p>

        <div className="location-card-footer">
          <span>
            ★ {accommodation.rating} ({accommodation.reviews} reviews)
          </span>

          <span>
            <strong>R{accommodation.price}</strong> / night
          </span>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;
