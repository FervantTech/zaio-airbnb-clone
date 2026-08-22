import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LocationFilter.css";

function LocationFilter() {
    const [location, setLocation] = useState("Cape Town");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        navigate(`/locations?city=${encodeURIComponent(location)}`);
    }

    return (
        <form className="location-filter" onSubmit={handleSubmit}>
            <div className="filter-field">
                <label htmlFor="location">Location</label>

                <select
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                >
                    <option value="Cape Town">Cape Town</option>
                    <option value="Johannesburg">Johannesburg</option>
                    <option value="Durban">Durban</option>
                    <option value="Pretoria">Pretoria</option>
                </select>
            </div>

            <button type="submit">Search</button>
        </form>
    );
}

export default LocationFilter;