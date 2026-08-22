import "../CSS/Footer.css";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h3>Support</h3>
          <a href="#help">Help Centre</a>
          <a href="#safety">Safety information</a>
          <a href="#cancellation">Cancellation options</a>
          <a href="#accessibility">Accessibility</a>
        </div>

        <div>
          <h3>Community</h3>
          <a href="#disaster-relief">Disaster relief housing</a>
          <a href="#refugees">Support refugees</a>
          <a href="#discrimination">Combating discrimination</a>
        </div>

        <div>
          <h3>Hosting</h3>
          <a href="#host">Try hosting</a>
          <a href="#aircover">AirCover for Hosts</a>
          <a href="#resources">Explore hosting resources</a>
          <a href="#community">Visit our community forum</a>
        </div>

        <div>
          <h3>About</h3>
          <a href="#newsroom">Newsroom</a>
          <a href="#features">Learn about new features</a>
          <a href="#careers">Careers</a>
          <a href="#investors">Investors</a>
        </div>
      </div>

      <div className="copyright-footer">
        <div>
          <span>© 2026 Airbnb Clone</span>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>

        <div className="footer-settings">
          <button type="button">English (ZA)</button>
          <button type="button">ZAR</button>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
