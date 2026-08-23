import { Link } from "react-router-dom";
import locations from "../data/locations";
import "../CSS/Inspiration.css";

function Inspiration() {
  return (
    <section className="inspiration">
      <h2>Inspiration for your next trip</h2>

      <div className="inspiration-grid">
        {locations.map((location) => (
          <Link
            className="inspiration-card"
                        to={`/locations?city=${encodeURIComponent(
                            location.name
                        )}`}
            key={location.id}
            style={{ backgroundColor: location.color }}
          >
            <img src={location.image} alt={location.name} />

            <div className="inspiration-card-content">
              <h3>{location.name}</h3>
              <p>{location.distance}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Inspiration;
