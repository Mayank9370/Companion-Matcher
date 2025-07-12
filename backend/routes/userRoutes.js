const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserMatches
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/matches/:username', getUserMatches);

module.exports = router;
