import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { charactersAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    class: '',
    backstory: ''
  });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCharacters();
  }, [isAuthenticated, navigate]);

  const fetchCharacters = async () => {
    try {
      const response = await charactersAPI.getAll();
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await charactersAPI.create(formData);
      setFormData({ name: '', race: '', class: '', backstory: '' });
      setShowForm(false);
      fetchCharacters();
    } catch (error) {
      console.error('Error creating character:', error);
      alert('Failed to create character');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      try {
        await charactersAPI.delete(id);
        fetchCharacters();
      } catch (error) {
        console.error('Error deleting character:', error);
        alert('Failed to delete character');
      }
    }
  };

  if (loading) return <div className="loading">Loading characters...</div>;

  return (
    <div className="characters-page">
      <div className="page-header">
        <h1>My Characters</h1>
        <button 
          className="create-button" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Character'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="character-form">
          <h2>Create New Character</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Character name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="race">Race</label>
            <input
              type="text"
              id="race"
              name="race"
              value={formData.race}
              onChange={handleChange}
              required
              placeholder="e.g., Human, Elf, Dwarf"
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class</label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              placeholder="e.g., Warrior, Mage, Rogue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="backstory">Backstory</label>
            <textarea
              id="backstory"
              name="backstory"
              value={formData.backstory}
              onChange={handleChange}
              rows="4"
              placeholder="Character backstory (optional)"
            />
          </div>

          <button type="submit" className="submit-button">
            Create Character
          </button>
        </form>
      )}

      <div className="characters-grid">
        {characters.length === 0 ? (
          <p className="empty-message">
            You haven't created any characters yet. Click "Create New Character" to begin!
          </p>
        ) : (
          characters.map((character) => (
            <div key={character._id} className="character-card">
              <h3>{character.name}</h3>
              <p><strong>Race:</strong> {character.race}</p>
              <p><strong>Class:</strong> {character.class}</p>
              <p><strong>Level:</strong> {character.level}</p>
              {character.backstory && (
                <p className="backstory">{character.backstory}</p>
              )}
              <div className="card-actions">
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(character._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Characters;
