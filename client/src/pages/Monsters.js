import React, { useState, useEffect } from 'react';
import { monstersAPI } from '../utils/api';
import './Monsters.css';

const Monsters = () => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonsters();
  }, []);

  const fetchMonsters = async () => {
    try {
      const response = await monstersAPI.getAll();
      setMonsters(response.data);
    } catch (error) {
      console.error('Error fetching monsters:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading monsters...</div>;

  return (
    <div className="monsters-page">
      <h1>Monsters & Creatures</h1>
      <p className="page-description">
        Fearsome creatures that roam the lands of Midnight Nation
      </p>

      <div className="monsters-grid">
        {monsters.length === 0 ? (
          <div className="placeholder-content">
            <p>The bestiary of Midnight Nation is being compiled...</p>
            <p>Soon you'll discover the creatures that lurk in the shadows.</p>
          </div>
        ) : (
          monsters.map((monster) => (
            <div key={monster._id} className="monster-card">
              <div className="monster-header">
                <h3>{monster.name}</h3>
                <span className="challenge-rating">CR {monster.challenge}</span>
              </div>
              <p className="monster-type">{monster.type}</p>
              <p className="monster-description">{monster.description}</p>
              
              <div className="monster-stats">
                <h4>Stats</h4>
                <div className="stats-grid">
                  <div><strong>STR:</strong> {monster.stats.strength}</div>
                  <div><strong>DEX:</strong> {monster.stats.dexterity}</div>
                  <div><strong>CON:</strong> {monster.stats.constitution}</div>
                  <div><strong>INT:</strong> {monster.stats.intelligence}</div>
                  <div><strong>WIS:</strong> {monster.stats.wisdom}</div>
                  <div><strong>CHA:</strong> {monster.stats.charisma}</div>
                </div>
                <p className="health"><strong>Health:</strong> {monster.health}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Monsters;
