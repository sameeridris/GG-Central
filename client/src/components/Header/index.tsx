import { Link } from 'react-router-dom';
import { type MouseEvent } from 'react';
import Auth from '../../utils/auth';
import './index.css'; // Import the CSS file

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };

  return (
    <header className="header-container">
      <div className="header-title">
        <Link className="text-light" to="/">
          <h1 className="your-games">GG Central</h1>
        </Link>
      </div>
      <div className="header-search">
        <input type="text" placeholder="Search for a game..." />
      </div>
      <div className="header-auth">
        {Auth.loggedIn() ? (
          <>
            <Link className="btn btn-info" to="/me">
              {Auth.getProfile().data.username}'s Profile
            </Link>
            <button className="btn btn-light" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-info" to="/login">
              Sign In
            </Link>
            <Link className="btn btn-light" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
