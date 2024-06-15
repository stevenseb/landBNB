import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    console.log("Logout button clicked");
    dispatch(sessionActions.logout())
      .then(() => {
        console.log("Logout successful");
        navigate('/');
        setShowMenu(false);
      })
      .catch((error) => {
        console.error("Logout failed", error);
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

  const navigateTo = (path) => {
    navigate(path);
    setShowMenu(false);
  };

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
            <button onClick={() => navigateTo('/')} className="profile-dropdown-item">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo('/booking')} className="profile-dropdown-item">
              Bookings
            </button>
          </li>
          <li>
            <button onClick={() => navigateTo('/manage-spots')} className="profile-dropdown-item">
              Manage Spots
            </button>
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
