const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const db = require('../db');

const router = express.Router();

// Setup Auth Middleware
router.use(isAuthenticated);

router.get('', async (req, res) => {
  const { limit = 5, offset = 0 } = req.query;
  const user = req.user;

  try {
    const history = await db.models.History.findAndCountAll({
      limit,
      offset,
      where: {
        userId: user.id,
      },
      attributes: {
        exclude: ['userId', 'updatedAt'],
      },
    });

    return res.send(history);
  } catch (err) {
    return res.status(500).send('Internal server error.');
  }
});

module.exports = router;
