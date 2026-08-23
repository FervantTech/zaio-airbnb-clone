import "../CSS/Footer.css";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h3>Support</h3>
          <a href="#help">Help Centre</a>
          <a href="#safety">Safety information</a>
          <a href="#cancellation">Cancellation options</a>
          <a href="#covid-response">Our COVID-19 Response</a>
          <a href="#accessibility">Supporting people with disabilities</a>
          <a href="#neighbourhood">Report a neighbourhood concern</a>
        </div>

        <div>
          <h3>Community</h3>
          <a href="#disaster-relief">Airbnb.org: disaster relief housing</a>
          <a href="#refugees">Support: Afghan refugees</a>
          <a href="#diversity">Celebrating diversity &amp; belonging</a>
          <a href="#discrimination">Combating discrimination</a>
        </div>

        <div>
          <h3>Hosting</h3>
          <a href="#host">Try hosting</a>
          <a href="#aircover">AirCover for Hosts</a>
          <a href="#resources">Explore hosting resources</a>
          <a href="#community">Visit our community forum</a>
          <a href="#responsible-hosting">How to host responsibly</a>
        </div>

        <div>
          <h3>About</h3>
          <a href="#newsroom">Newsroom</a>
          <a href="#features">Learn about new features</a>
          <a href="#founders">Letter from our founders</a>
          <a href="#careers">Careers</a>
          <a href="#investors">Investors</a>
          <a href="#airbnb-luxe">Airbnb Luxe</a>
        </div>
      </div>

      <div className="copyright-footer">
        <div>
          <span>© 2022 Airbnb, Inc.</span>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#sitemap">Sitemap</a>
        </div>

        <div className="footer-settings">
          <button type="button">
            <FaGlobe /> English (US)
          </button>
          <button type="button">$ USD</button>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <FaTwitter />
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
