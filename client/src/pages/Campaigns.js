import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { campaignsAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Campaigns.css';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCampaigns();
  }, [isAuthenticated, navigate]);

  const fetchCampaigns = async () => {
    try {
      const response = await campaignsAPI.getAll();
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
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
      await campaignsAPI.create(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Failed to create campaign');
    }
  };

  const handleJoin = async (id) => {
    try {
      await campaignsAPI.join(id);
      fetchCampaigns();
    } catch (error) {
      console.error('Error joining campaign:', error);
      alert('Failed to join campaign');
    }
  };

  const handleLeave = async (id) => {
    if (window.confirm('Are you sure you want to leave this campaign?')) {
      try {
        await campaignsAPI.leave(id);
        fetchCampaigns();
      } catch (error) {
        console.error('Error leaving campaign:', error);
        alert('Failed to leave campaign');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await campaignsAPI.delete(id);
        fetchCampaigns();
      } catch (error) {
        console.error('Error deleting campaign:', error);
        alert('Failed to delete campaign');
      }
    }
  };

  if (loading) return <div className="loading">Loading campaigns...</div>;

  return (
    <div className="campaigns-page">
      <div className="page-header">
        <h1>Campaigns</h1>
        <button 
          className="create-button" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Campaign'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="campaign-form">
          <h2>Create New Campaign</h2>
          <div className="form-group">
            <label htmlFor="name">Campaign Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter campaign name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your campaign"
            />
          </div>

          <button type="submit" className="submit-button">
            Create Campaign
          </button>
        </form>
      )}

      <div className="campaigns-grid">
        {campaigns.length === 0 ? (
          <p className="empty-message">
            No campaigns available. Create one to get started!
          </p>
        ) : (
          campaigns.map((campaign) => {
            const isGamemaster = campaign.gamemaster._id === user?.id;
            const isPlayer = campaign.players.some(p => p._id === user?.id);

            return (
              <div key={campaign._id} className="campaign-card">
                <h3>{campaign.name}</h3>
                <p><strong>Gamemaster:</strong> {campaign.gamemaster.username}</p>
                <p><strong>Players:</strong> {campaign.players.length}</p>
                {campaign.description && (
                  <p className="description">{campaign.description}</p>
                )}
                <div className="card-actions">
                  {isGamemaster ? (
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(campaign._id)}
                    >
                      Delete Campaign
                    </button>
                  ) : isPlayer ? (
                    <button 
                      className="leave-button"
                      onClick={() => handleLeave(campaign._id)}
                    >
                      Leave Campaign
                    </button>
                  ) : (
                    <button 
                      className="join-button"
                      onClick={() => handleJoin(campaign._id)}
                    >
                      Join Campaign
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Campaigns;
