const { addUser, findMatchesByUsername } = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, age, interests } = req.body;
    if (!name || !age || !Array.isArray(interests)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    await addUser({ name, age, interests });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserMatches = async (req, res) => {
  try {
    const username = req.params.username;
    const matches = await findMatchesByUsername(username);
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};