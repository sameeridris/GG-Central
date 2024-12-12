import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';
import GameCard from '../components/GameCard';
import '../style/Home.css';

// Define the Game interface directly in the same file for clarity
interface Game {
  id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
  status: string;
}

const Home: React.FC = () => {console.log("a")
  const navigate = useNavigate();
  console.log("b")
  const { loading, data, error } = useQuery(QUERY_ME);
console.log(loading,error,data)
  const handleBoxClick = () => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.me || {};
  const pressStartGames: Game[] = user.game?.filter((game: Game) => game.status === 'Press Start') || [];
  const loadingGames: Game[] = user.game?.filter((game: Game) => game.status === 'Loading') || [];
  const wellPlayedGames: Game[] = user.game?.filter((game: Game) => game.status === 'Well Played') || [];
console.log
  return (
    <main>
      <div className="home-container">
        {/* Press Start Column */}
        <div className="column-wrapper" onClick={handleBoxClick}>
          <h2>[ Press Start ]</h2>
          <div className="column not-yet-played">
            {Auth.loggedIn() ? (
              pressStartGames.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="empty-state">
                <p>Please log in to start your catalog</p>
              </div>
            )}
          </div>
        </div>

        {/* Loading Column */}
        <div className="column-wrapper" onClick={handleBoxClick}>
          <h2>[ Loading. . .]</h2>
          <div className="column playing">
            {Auth.loggedIn() ? (
              loadingGames.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="empty-state">
                <p>Please log in to start your catalog</p>
              </div>
            )}
          </div>
        </div>

        {/* Well Played Column */}
        <div className="column-wrapper" onClick={handleBoxClick}>
          <h2>[ Well Played ]</h2>
          <div className="column played">
            {Auth.loggedIn() ? (
              wellPlayedGames.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="empty-state">
                <p>Please log in to start your catalog</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
