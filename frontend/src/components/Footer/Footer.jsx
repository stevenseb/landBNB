import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h2>Landbnb</h2>
          <p>&copy; 2024 Landbnb. All rights reserved.</p>
          <p>123 Market Street, San Francisco, CA 94103</p>
          <p>Phone: (415) 555-1234</p>
        </div>
        <div className="footer-links">
          <p>Terms</p>
          <p>Privacy</p>
          <p>Sitemap</p>
        </div>
        <div className="footer-social">
          <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          <FontAwesomeIcon icon={faFacebook} className="social-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
