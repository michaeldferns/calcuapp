const express = require('express');
const { check, validationResult } = require('express-validator');
const isAuthenticated = require('../middlewares/isAuthenticated');
const db = require('../db');
const math = require('../utils/math');

const router = express.Router();

// Setup Auth Middleware
router.use(isAuthenticated);

/**
 * Add
 */
router.post('/add', async (req, res) => {
  const { currentInput, previousInput, text } = req.body;

  const user = req.user;

  try {
    const value = math.addNumbers(previousInput, currentInput);

    if (isNaN(value) || !isFinite(value)) {
      throw new Error();
    }

    await db.models.History.create({
      userId: user.id,
      value: value.toString(),
      text,
    });

    return res.send({
      value,
    });
  } catch (err) {
    try {
      await db.models.History.create({
        userId: user.id,
        value: 'ERR',
        text,
      });
    } catch (err) {
      return res.status(500).send('Internal server error.');
    }

    return res.status(500).send('Internal server error.');
  }
});

/**
 * Subtract
 */
router.post('/subtract', async (req, res) => {
  const { currentInput, previousInput, text } = req.body;

  const user = req.user;

  try {
    const value = math.subtractNumbers(previousInput, currentInput);

    if (isNaN(value) || !isFinite(value)) {
      throw new Error();
    }

    await db.models.History.create({
      userId: user.id,
      value: value.toString(),
      text,
    });

    return res.send({
      value,
    });
  } catch (err) {
    try {
      await db.models.History.create({
        userId: user.id,
        value: 'ERR',
        text,
      });
    } catch (err) {
      return res.status(500).send('Internal server error.');
    }

    return res.status(500).send('Internal server error.');
  }
});

/**
 * Multiply
 */
router.post('/multiply', async (req, res) => {
  const { currentInput, previousInput, text } = req.body;

  const user = req.user;

  try {
    const value = math.multiplyNumbers(previousInput, currentInput);

    if (isNaN(value) || !isFinite(value)) {
      throw new Error();
    }

    await db.models.History.create({
      userId: user.id,
      value: value.toString(),
      text,
    });

    return res.send({
      value,
    });
  } catch (err) {
    try {
      await db.models.History.create({
        userId: user.id,
        value: 'ERR',
        text,
      });
    } catch (err) {
      return res.status(500).send('Internal server error.');
    }

    return res.status(500).send('Internal server error.');
  }
});

/**
 * Divide
 */
router.post('/divide', async (req, res) => {
  const { currentInput, previousInput, text } = req.body;

  const user = req.user;

  try {
    const value = math.divideNumbers(previousInput, currentInput);

    if (isNaN(value) || !isFinite(value)) {
      throw new Error();
    }

    await db.models.History.create({
      userId: user.id,
      value: value.toString(),
      text,
    });

    return res.send({
      value,
    });
  } catch (err) {
    try {
      await db.models.History.create({
        userId: user.id,
        value: 'ERR',
        text,
      });
    } catch (err) {
      return res.status(500).send('Internal server error.');
    }

    return res.status(500).send('Internal server error.');
  }
});

/**
 * Square Root
 */
router.post('/root', async (req, res) => {
  const { leftValue } = req.body;

  try {
    const sum = math.squareRoot(leftValue);

    return res.send({
      value: sum,
    });
  } catch (err) {
    return res.status(500).send('Internal server error.');
  }
});

module.exports = router;
