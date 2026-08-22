import { useState } from "react";
import "../CSS/FutureGetaways.css";

const getaways = {
    "Popular destinations": [
        { city: "Cape Town", type: "Holiday rentals" },
        { city: "Johannesburg", type: "Apartment rentals" },
        { city: "Durban", type: "Beach house rentals" },
        { city: "Pretoria", type: "House rentals" },
        { city: "Gqeberha", type: "Cottage rentals" },
        { city: "Knysna", type: "Cabin rentals" },
    ],
    "Arts and culture": [
        { city: "Paris", type: "Holiday rentals" },
        { city: "Rome", type: "Apartment rentals" },
        { city: "Barcelona", type: "House rentals" },
        { city: "Athens", type: "Villa rentals" },
        { city: "London", type: "Apartment rentals" },
        { city: "Vienna", type: "Holiday rentals" },
    ],
    "Beach destinations": [
        { city: "Camps Bay", type: "Beach house rentals" },
        { city: "Umhlanga", type: "Apartment rentals" },
        { city: "Ballito", type: "Villa rentals" },
        { city: "Hermanus", type: "Cottage rentals" },
        { city: "Plettenberg Bay", type: "House rentals" },
        { city: "Jeffreys Bay", type: "Beach house rentals" },
    ],
};

function FutureGetaways() {
    const categories = Object.keys(getaways);
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    return (
        <section className="future-getaways">
            <h2>Inspiration for future getaways</h2>

            <div className="getaway-tabs">
                {categories.map((category) => (
                    <button
                        className={
                            activeCategory === category ? "active-tab" : ""
                        }
                        type="button"
                        key={category}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="getaway-list">
                {getaways[activeCategory].map((getaway) => (
                    <div className="getaway-item" key={getaway.city}>
                        <h3>{getaway.city}</h3>
                        <p>{getaway.type}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FutureGetaways;