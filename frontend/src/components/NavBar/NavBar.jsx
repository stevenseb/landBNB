import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
//import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './NavBar.css';
import logo from '../../../assets/LandbnbLogo.png';
import hamburger from '../../../assets/PinkHamburger.png'

const NavBar = () => {
  //const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
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
        {sessionUser && <ProfileButton user={sessionUser} />}
        <button className="navbar-button hamburger-button" onClick={handleMenuToggle}>
        <img src={hamburger} alt="Menu" className="navbar-logo" />
          {/* &#9776; */} {/* Unicode character for hamburger icon */}
        </button>
        {menuOpen && (
          <div className="dropdown-menu" ref={menuRef}>
            {sessionUser ? (
              <>
                <NavLink to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/listing" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  List Your Land
                </NavLink>
                {/* <NavLink to="/" onClick={handleLogout} className="dropdown-item">
                  Logout
                </NavLink> */}
                {/* <NavLink to="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Profile
                </NavLink> */}
                <NavLink to="/bookings" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Bookings
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/login" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/signup" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
