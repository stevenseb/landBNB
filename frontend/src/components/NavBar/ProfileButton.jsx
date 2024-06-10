import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import hamburger from '../../../assets/PinkHamburger.png';
import * as sessionActions from '../../store/session';
import './NavBar.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => {
      navigate('/');
      setShowMenu(false);
    });
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  return (
    <div className="profile-button-container" ref={menuRef}>
      <button className="profile-button" onClick={toggleMenu}>
        <img src={hamburger} alt="Menu" className="hamburger-icon" />
        <FaUserCircle className="user-icon" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-info">
            <div>Hello {user.firstName}!</div>
            <div>&#x2022; {user.username}</div>
            <div>&#x2022; {user.firstName} {user.lastName}</div>
            <div>&#x2022; {user.email}</div>
          </li>
          <hr />
          <li>
            <NavLink to="/" className="profile-dropdown-item" onClick={() => setShowMenu(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className="profile-dropdown-item" onClick={() => setShowMenu(false)}>
              Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-spots" className="profile-dropdown-item" onClick={() => setShowMenu(false)}>
              Manage Spots
            </NavLink>
          </li>
          <li>
            <button onClick={logout} className="profile-dropdown-item logout">Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
