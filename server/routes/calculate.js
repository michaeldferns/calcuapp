const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const db = require('../db');

const router = express.Router();

// Setup Auth Middleware
router.use(isAuthenticated);

router.get('', (req, res) => {
  console.log(db.models);

  res.send('hello from calculate middleware');
});

module.exports = router;
