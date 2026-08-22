import hostingImage from "../assets/images/hosting.jpg";
import "../CSS/HostingQuestions.css";

function HostingQuestions() {
    return (
        <section
            className="hosting-questions"
            style={{ backgroundImage: `url(${hostingImage})` }}
        >
            <div className="hosting-content">
                <h2>Questions about hosting?</h2>
                <button type="button">Ask a Superhost</button>
            </div>
        </section>
    );
}

export default HostingQuestions;