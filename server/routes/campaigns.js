const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Campaign = require('../models/Campaign');

// Get all campaigns
router.get('/', auth, async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      $or: [
        { gamemaster: req.user._id },
        { players: req.user._id }
      ]
    })
      .populate('gamemaster', 'username')
      .populate('players', 'username')
      .populate('characters');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaigns', error: error.message });
  }
});

// Get single campaign
router.get('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('gamemaster', 'username')
      .populate('players', 'username')
      .populate('characters');
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if user is part of campaign
    const isPartOfCampaign = campaign.gamemaster._id.equals(req.user._id) ||
      campaign.players.some(player => player._id.equals(req.user._id));
    
    if (!isPartOfCampaign) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching campaign', error: error.message });
  }
});

// Create new campaign
router.post('/', auth, async (req, res) => {
  try {
    const campaign = new Campaign({
      ...req.body,
      gamemaster: req.user._id
    });
    await campaign.save();
    
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating campaign', error: error.message });
  }
});

// Update campaign
router.put('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Only gamemaster can update
    if (!campaign.gamemaster.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only gamemaster can update campaign' });
    }
    
    Object.assign(campaign, req.body);
    await campaign.save();
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error updating campaign', error: error.message });
  }
});

// Join campaign
router.post('/:id/join', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Check if already a player
    if (campaign.players.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already in campaign' });
    }
    
    campaign.players.push(req.user._id);
    await campaign.save();
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Error joining campaign', error: error.message });
  }
});

// Leave campaign
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    campaign.players = campaign.players.filter(
      player => !player.equals(req.user._id)
    );
    await campaign.save();
    
    res.json({ message: 'Left campaign successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving campaign', error: error.message });
  }
});

// Delete campaign
router.delete('/:id', auth, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    
    // Only gamemaster can delete
    if (!campaign.gamemaster.equals(req.user._id)) {
      return res.status(403).json({ message: 'Only gamemaster can delete campaign' });
    }
    
    await campaign.deleteOne();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting campaign', error: error.message });
  }
});

module.exports = router;
