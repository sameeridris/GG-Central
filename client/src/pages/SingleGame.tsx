import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import '../style/SingleGame.css'; 
import { QUERY_SINGLE_GAME } from '../utils/queries';

// Correcting the type definition
type GameParams = {
  id: string | undefined;
};

const SingleGame: React.FC = () => {
  const { id } = useParams<GameParams>();

  const { loading, error, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { gameId: id },
  });

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
  console.log(game);

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
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
