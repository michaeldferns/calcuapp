const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const db = require('../db');
const emailValidator = require('../utils/validators/emailValidator');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

/**
 * Get Current User (session)
 */
router.get('/current_user', (req, res) => {
  return res.send(req.user);
});

/**
 * Logout
 */
router.get('/logout', (req, res) => {
  req.logout();

  return res.send();
});

/**
 * Delete
 */
router.get('/delete', [isAuthenticated], async (req, res) => {
  const user = req.user;

  try {
    const deletedUser = await db.models.User.findOne({
      where: {
        id: user.id,
      },
    });

    if (!deletedUser) {
      return res.status(404).send('Failed to find user to delete.');
    }

    await deletedUser.destroy();

    req.logout();

    return res.send(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Internal server error.');
  }
});

/**
 * Login
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.send(req.user);
});

/**
 * User Registration
 */
router.post(
  '/register',
  check('email')
    .isEmail()
    .withMessage('The provided value must be a valid email.')
    .custom(emailValidator),
  check('password')
    .isString()
    .withMessage('A value for password is required.')
    .isLength({ min: 8, max: 200 })
    .withMessage(
      'The provided value must be min 8 characters and max 200 characters.'
    ),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const newUser = await db.models.User.create({
        email,
        password,
      });

      return res.status(201).send(newUser);
    } catch (err) {
      console.log(err.message);

      return res.status(500).send('Internal server error.');
    }
  }
);

module.exports = router;
