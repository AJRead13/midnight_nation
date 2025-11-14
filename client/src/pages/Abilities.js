import React, { useState, useEffect } from 'react';
import { abilitiesAPI } from '../utils/api';
import './Abilities.css';

const Abilities = () => {
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchAbilities();
  }, []);

  const fetchAbilities = async () => {
    try {
      const response = await abilitiesAPI.getAll();
      setAbilities(response.data);
    } catch (error) {
      console.error('Error fetching abilities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAbilities = filterType
    ? abilities.filter(ability => ability.type === filterType)
    : abilities;

  if (loading) return <div className="loading">Loading abilities...</div>;

  return (
    <div className="abilities-page">
      <h1>Abilities & Powers</h1>
      <p className="page-description">
        Special abilities available to characters in Midnight Nation
      </p>

      <div className="type-filter">
        <button 
          className={filterType === '' ? 'active' : ''}
          onClick={() => setFilterType('')}
        >
          All
        </button>
        <button 
          className={filterType === 'passive' ? 'active' : ''}
          onClick={() => setFilterType('passive')}
        >
          Passive
        </button>
        <button 
          className={filterType === 'active' ? 'active' : ''}
          onClick={() => setFilterType('active')}
        >
          Active
        </button>
        <button 
          className={filterType === 'reaction' ? 'active' : ''}
          onClick={() => setFilterType('reaction')}
        >
          Reaction
        </button>
      </div>

      <div className="abilities-grid">
        {filteredAbilities.length === 0 ? (
          <div className="placeholder-content">
            <p>The abilities of Midnight Nation are being developed...</p>
            <p>Soon you'll discover powerful skills and magical powers for your characters.</p>
          </div>
        ) : (
          filteredAbilities.map((ability) => (
            <div key={ability._id} className="ability-card">
              <div className="ability-header">
                <h3>{ability.name}</h3>
                <span className={`ability-type ${ability.type}`}>
                  {ability.type}
                </span>
              </div>
              <p className="ability-description">{ability.description}</p>
              
              <div className="ability-details">
                {ability.damage && (
                  <p><strong>Damage:</strong> {ability.damage}</p>
                )}
                {ability.range && (
                  <p><strong>Range:</strong> {ability.range}</p>
                )}
                {ability.cost && (
                  <p><strong>Cost:</strong> {ability.cost}</p>
                )}
                <p><strong>Level Required:</strong> {ability.level}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Abilities;
