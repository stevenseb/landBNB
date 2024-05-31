// frontend/src/components/Navigation/ProfileButton.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './NavBar.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => {
    if (!showMenu) return;
    setShowMenu(false);
  };

  return (
    <div className="profile-button-container" onMouseLeave={closeMenu}>
      <button onClick={openMenu} className="profile-button">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="profile-info">
            <div>{user.username}</div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
          </li>
          <li>
            <NavLink to="/profile" className="profile-dropdown-item" onClick={closeMenu}>
              Profile
            </NavLink>
          </li>
          <li>
            <button onClick={logout} className="profile-dropdown-item">Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}
 
export default ProfileButton;
