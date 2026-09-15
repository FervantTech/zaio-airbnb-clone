const REVIEW_CATEGORIES = [
    { name: "Cleanliness", score: 5.0 },
    { name: "Accuracy", score: 4.8 },
    { name: "Communication", score: 4.9 },
    { name: "Location", score: 4.7 },
    { name: "Check-in", score: 4.8 },
    { name: "Value", score: 4.7 },
];

const SAMPLE_REVIEWS = [
    {
        name: "Alice",
        date: "March 2023",
        text: "Amazing place, very clean and well-located.",
    },
    {
        name: "Dave",
        date: "December 2022",
        text: "Fantastic stay! The location is perfect.",
    },
    {
        name: "Bob",
        date: "February 2023",
        text: "Great communication with the host and easy check-in process.",
    },
    {
        name: "Eve",
        date: "November 2022",
        text: "Very clean and spacious. Would definitely come back.",
    },
    {
        name: "Carol",
        date: "January 2023",
        text: "The apartment was exactly as described. Highly recommend.",
    },
    {
        name: "Frank",
        date: "October 2022",
        text: "Excellent value for the price. Loved the neighbourhood.",
    },
];

function ReviewSection({ rating, reviewCount }) {
    if (!reviewCount) {
        return (
            <section className="information-section review-section">
                <h2>★ New · No reviews yet</h2>
                <p>This accommodation has not received any guest reviews yet.</p>
            </section>
        );
    }

    return (
        <section className="information-section review-section">
            <h2>★ {rating} · {reviewCount} reviews</h2>

            <div className="rating-breakdown">
                {REVIEW_CATEGORIES.map((category) => (
                    <div className="rating-row" key={category.name}>
                        <span>{category.name}</span>
                        <span className="rating-track" aria-hidden="true">
                            <span
                                style={{
                                    width: `${(category.score / 5) * 100}%`,
                                }}
                            />
                        </span>
                        <strong>{category.score.toFixed(1)}</strong>
                    </div>
                ))}
            </div>

            <div className="review-grid">
                {SAMPLE_REVIEWS.map((review) => (
                    <article className="review-card" key={review.name}>
                        <div className="review-author">
                            <span className="review-avatar">
                                {review.name.charAt(0)}
                            </span>
                            <div>
                                <h3>{review.name}</h3>
                                <p>{review.date}</p>
                            </div>
                        </div>
                        <p>{review.text}</p>
                    </article>
                ))}
            </div>

            <button className="show-reviews-button" type="button">
                Show all {reviewCount} reviews
            </button>
        </section>
    );
}

export default ReviewSection;
