import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './NavBar.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
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
    <div className="profile-button-container">
      <button onClick={openMenu} className="profile-button">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={menuRef}>
          <li className="profile-info">
            <div>{user.username}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
          </li>
          <li>
            <NavLink to="/" className="dropdown-item" onClick={() => setShowMenu(false)}>
              Home
            </NavLink>
            </li>
          <li>
            <NavLink to="/profile" className="profile-dropdown-item" onClick={() => setShowMenu(false)}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/listing" className="profile-dropdown-item" onClick={() => setShowMenu(false)}>
              List Your Land
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookings" className="profile-dropdown-item" onClick={() => setShowMenu(false)}>
              Bookings
            </NavLink>
          </li>
          <li>
            <button onClick={logout} className="profile-dropdown-item logout logout:hover">Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
