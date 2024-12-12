import React from 'react';
import './index.css'
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

    </div>
  );
};

export default GameCard;
