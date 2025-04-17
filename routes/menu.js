const express = require('express');
const router = express.Router();
const MenuItem = require('../backend/models/MenuItem');

// POST /menu
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required.' });
  }
  try {
    const item = new MenuItem({ name, description, price });
    const savedItem = await item.save();
    res.status(201).json({ message: 'Item created', item: savedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /menu
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
