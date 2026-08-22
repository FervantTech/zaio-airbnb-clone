import giftCardsImage from "../assets/images/gift-cards.png";
import "../CSS/ShopAirbnb.css";

function ShopAirbnb() {
    return (
        <section className="shop-airbnb">
            <div className="shop-content">
                <h2>Shop Airbnb gift cards</h2>
                <button type="button">Learn more</button>
            </div>

            <div className="shop-image">
                <img src={giftCardsImage} alt="Airbnb gift cards" />
            </div>
        </section>
    );
}

export default ShopAirbnb;