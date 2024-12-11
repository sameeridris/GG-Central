import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_GAME, ADD_GAME_TO_LIBRARY } from '../utils/queries';
import Auth from '../utils/auth';
import '../style/SingleGame.css';




const SingleGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Define navigate here
  const { loading, error, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { gameId: id },
  });
  const [addGameToLibrary] = useMutation(ADD_GAME_TO_LIBRARY);

  const handleAddToLibrary = (status: string) => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    } else {
      addGameToLibrary({
        variables: {
          gameInput: {
            ...data.game, // Ensure data.game is correctly referenced
            status,
          },
        },
      })
        .then(() => {
          alert(`${data.game.name} has been added to your ${status} library!`);
        })
        .catch((err) => {
          console.error('Error adding game to library:', err);
          alert('Failed to add game to library.');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error fetching game:', error);
    return <div>Error loading game data. Please try again later.</div>;
  }

  if (!data || !data.game) {
    return <div>No game found.</div>;
  }

  const game = data.game;

  return (
    <div className="game-details-container my-3">
      <div className="game-details-grid">
        <div className="game-image-container">
          {game.imageUrl ? (
            <img src={game.imageUrl} alt={game.name} />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>
        <div className="game-info">
          <h1>{game.name}</h1>
          <p>{game.description || 'No description available.'}</p>
          {game.rating && <p className="game-rating">Rating: {game.rating}</p>}
          {Auth.loggedIn() && (
            <div className="add-to-library-buttons">
              <button id='press-start-button' onClick={() => handleAddToLibrary('Press Start')}>Add to Press Start</button>
              <button id='loading-button' onClick={() => handleAddToLibrary('Loading')}>Add to Loading</button>
              <button id='well-played-button' onClick={() => handleAddToLibrary('Well Played')}>Add to Well Played</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
