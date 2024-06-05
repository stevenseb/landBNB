import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
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
    });
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
            <div>Hello {user.firstName}</div>
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
