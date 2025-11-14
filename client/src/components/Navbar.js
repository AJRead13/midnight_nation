import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Midnight Nation
        </Link>
        
        <div className="navbar-menu">
          <Link to="/lore" className="navbar-link">Lore</Link>
          <Link to="/characters" className="navbar-link">Characters</Link>
          <Link to="/monsters" className="navbar-link">Monsters</Link>
          <Link to="/abilities" className="navbar-link">Abilities</Link>
          <Link to="/rules" className="navbar-link">Rules</Link>
          
          {isAuthenticated && (
            <Link to="/campaigns" className="navbar-link">Campaigns</Link>
          )}
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">Welcome, {user.username}!</span>
              <button onClick={logout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-button">Login</Link>
              <Link to="/register" className="navbar-button navbar-button-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
