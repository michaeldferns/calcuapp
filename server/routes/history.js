const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('', async (req, res) => {
  const user = req.user;

  try {
    const history = await db.models.History.findAll({
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
