const express = require('express');
const authRouter = require('./auth');
const calculateRouter = require('./calculate');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.isAuthenticated());
  res.send('hello there');
});

// Add routers to root routers
router.use('/auth', authRouter);
router.use('/calculate', calculateRouter);

module.exports = router;
