import React from 'react';

interface Game {
  id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
  status: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.name} />
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <p>Rating: {game.rating}</p>
      <p>Status: {game.status}</p>
    </div>
  );
};

export default GameCard;
