// src/pages/Home.tsx

//import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import '../style/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    if (!Auth.loggedIn()) {
      navigate('/login');
    }
  };

  return (
    <main>
      <div className="home-container">
        {/* Press Start Column */}
        <div className="column-wrapper" onClick={handleBoxClick}>
          <h2>[ Press Start ]</h2>
          <div className="column not-yet-played">
            <div className="empty-state">
              <p>Please log in to start your catalog</p>
            </div>
          </div>
        </div>

        {/* Loading Column */}
        <div className="column-wrapper" onClick={handleBoxClick}>
          <h2>[ Loading. . .]</h2>
          <div className="column playing">
            <div className="empty-state">
              <p>Please log in to start your catalog</p>
            </div>
          </div>
        </div>

        {/* Well Played Column */}
        <div className="column-wrapper" onClick={handleBoxClick}>
          <h2>[ Well Played ]</h2>
          <div className="column played">
            <div className="empty-state">
              <p>Please log in to start your catalog</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
