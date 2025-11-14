import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Midnight Nation</h1>
        <p className="hero-subtitle">
          A Tabletop RPG Experience
        </p>
        <p className="hero-description">
          Enter a world of darkness and adventure. Create characters, join campaigns, 
          and explore the rich lore of Midnight Nation.
        </p>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Create Characters</h3>
          <p>Build unique characters with diverse abilities and backstories</p>
        </div>
        <div className="feature-card">
          <h3>Join Campaigns</h3>
          <p>Connect with other players and embark on epic adventures</p>
        </div>
        <div className="feature-card">
          <h3>Explore Lore</h3>
          <p>Discover the rich history and legends of the Midnight Nation</p>
        </div>
        <div className="feature-card">
          <h3>Battle Monsters</h3>
          <p>Face fearsome creatures and test your skills in combat</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
