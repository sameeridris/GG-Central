import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import debounce from 'lodash.debounce';
import Auth from '../../utils/auth';
import { SEARCH_GAMES, ADD_GAME_TO_LIBRARY } from '../../utils/queries';
import './index.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchGames, { loading, error, data }] = useLazyQuery(SEARCH_GAMES);
  const [addGameToLibrary] = useMutation(ADD_GAME_TO_LIBRARY);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim() !== '') {
        searchGames({ variables: { name: value } });
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 1000),
    [searchGames]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSelectGame = (game: any) => {
    navigate(`/game/${game.id}`);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleAddToLibrary = (game: any, status: string) => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    } else {
      addGameToLibrary({
        variables: {
          gameInput: {
            ...game,
            status,
          },
        },
      })
        .then(() => {
          alert(`${game.name} has been added to your ${status} library!`);
        })
        .catch((err) => {
          console.error('Error adding game to library:', err);
          alert('Failed to add game to library.');
        });
    }
  };

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, [wrapperRef]);

  return (
    <header className="header-container">
      <div className="header-title">
        <Link className="text-light" to="/">
          <h1 className="your-games">GG Central</h1>
        </Link>
      </div>
      <div className="header-search" ref={wrapperRef}>
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        {showSuggestions && (
          <div className="suggestions-container">
            {loading && <p className="search-loading">Loading...</p>}
            {error && <p className="search-error">Error loading suggestions.</p>}
            {data && data.searchGames && data.searchGames.length > 0 && (
              <ul className="suggestions-list">
                {data.searchGames.map((game: any) => (
                  <li
                    key={game.id}
                    className="suggestion-item"
                    onClick={() => handleSelectGame(game)}
                  >
                    {game.imageUrl ? (
                      <img
                        src={game.imageUrl}
                        alt={game.name}
                        className="game-image"
                      />
                    ) : (
                      <div className="game-image-placeholder"></div>
                    )}
                    <div className="game-details">
                      <h4>{game.name}</h4>
                      {Auth.loggedIn() && (
                        <div className="add-to-library-buttons">
                          <button onClick={(e) => { e.stopPropagation(); handleAddToLibrary(game, 'Press Start'); }}>+</button>
                          <button onClick={(e) => { e.stopPropagation(); handleAddToLibrary(game, 'Loading'); }}>+</button>
                          <button onClick={(e) => { e.stopPropagation(); handleAddToLibrary(game, 'Well Played'); }}>+</button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {data && data.searchGames && data.searchGames.length === 0 && (
              <p className="no-results">No results found.</p>
            )}
          </div>
        )}
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
