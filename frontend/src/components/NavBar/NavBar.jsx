import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import './NavBar.css';
import logo from '../../../assets/LandbnbLogo.png';
import hamburger from '../../../assets/PinkHamburger.png';

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">
          <img src={logo} alt="Landbnb" className="navbar-logo" />
        </NavLink>
      </div>
      <div className="navbar-links">
        {sessionUser && (
          <NavLink to="/spots/new" className="create-spot-link">
            Create a New Spot
          </NavLink>
        )}
        <div className="menu-button">
          <button className="hamburger-button" onClick={handleMenuToggle}>
            <img src={hamburger} alt="Menu" className="hamburger-icon" />
          </button>
          {sessionUser && <ProfileButton user={sessionUser} />}
        </div>
        <div className="dark-mode-container">
          <label className="dark-mode-toggle">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">MODE</span>
        </div>
        {!sessionUser && menuOpen && (
          <div className="dropdown-menu" ref={menuRef}>
            <ul>
              <li className="dropdown-item" onClick={() => setMenuOpen(false)}>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                  className="text-link"
                />
              </li>
              <li className="dropdown-item" onClick={() => setMenuOpen(false)}>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                  className="text-link"
                />
              </li>
              {isLoaded}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
