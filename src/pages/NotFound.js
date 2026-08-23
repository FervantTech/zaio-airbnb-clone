import { Link } from "react-router-dom";
import "../CSS/NotFound.css";

function NotFound() {
    return (
        <main className="not-found-page">
            <p className="not-found-code">404</p>
            <h1>Page not found</h1>
            <p>The page you’re looking for does not exist.</p>

            <div className="not-found-actions">
                <Link to="/">Return home</Link>
                <Link to="/locations">Browse places to stay</Link>
            </div>
        </main>
    );
}

export default NotFound;
