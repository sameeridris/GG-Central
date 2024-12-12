import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_GAME, ADD_GAME_TO_LIBRARY, QUERY_THOUGHTS } from '../utils/queries';
import Auth from '../utils/auth';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import '../style/SingleGame.css';

const SingleGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { gameId: id },
  });
  const { loading: commentsLoading, error: commentsError, data: commentsData } = useQuery(QUERY_THOUGHTS);
  const [addGameToLibrary] = useMutation(ADD_GAME_TO_LIBRARY);
  // const [addThought] = useMutation(QUERY_THOUGHTS);

  const handleAddToLibrary = (status: string) => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    } else {
      addGameToLibrary({
        variables: {
          gameInput: {
            ...data.game,
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

  // const handleAddThought = (commentText: string) => {
  //   if (!Auth.loggedIn()) {
  //     navigate('/login');
  //   } else {
  //     addThought({
  //       variables: {
  //         thoughtId: id,
  //         commentText,
  //       },
  //       refetchQueries: [{ query: QUERY_THOUGHTS }],
  //     })
  //       .catch((err) => {
  //         console.error('Error adding comment:', err);
  //         alert('Failed to add comment.');
  //       });
  //   }
  // };

  if (loading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (error || commentsError) {
    console.error('Error fetching game or comments:', error || commentsError);
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
              <button onClick={() => handleAddToLibrary('Press Start')}>Add to Press Start</button>
              <button onClick={() => handleAddToLibrary('Loading')}>Add to Loading</button>
              <button onClick={() => handleAddToLibrary('Well Played')}>Add to Well Played</button>
            </div>
          )}
        </div>
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        {Auth.loggedIn() && <ThoughtForm />}
        <ThoughtList thoughts={commentsData?.thoughts || []} title='Comments'/>
      </div>
    </div>
  );
};

export default SingleGame;
