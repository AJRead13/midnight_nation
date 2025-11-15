import React, { useState, useEffect } from 'react';
import { loreAPI } from '../utils/api';
import './Lore.css';

const Lore = () => {
  const [lore, setLore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['history', 'location', 'faction', 'deity', 'legend', 'other'];

  const fetchLore = async () => {
    try {
      const response = await loreAPI.getAll(selectedCategory);
      setLore(response.data);
    } catch (error) {
      console.error('Error fetching lore:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  if (loading) return <div className="loading">Loading lore...</div>;

  return (
    <div className="lore-page">
      <h1>Midnight Nation Lore</h1>
      
      <div className="category-filter">
        <button 
          className={selectedCategory === '' ? 'active' : ''}
          onClick={() => setSelectedCategory('')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="lore-grid">
        {lore.length === 0 ? (
          <div className="placeholder-content">
            <p>The lore of Midnight Nation is being written...</p>
            <p>Check back soon for tales of history, legends, and the mysteries of this world.</p>
          </div>
        ) : (
          lore.map((entry) => (
            <div key={entry._id} className="lore-card">
              <div className="lore-category">{entry.category}</div>
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Lore;
