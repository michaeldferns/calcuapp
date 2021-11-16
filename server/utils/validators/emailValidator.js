const db = require('../../db');

module.exports = async (value) => {
  if (!value || typeof value !== 'string') {
    return Promise.reject('The provided value must be a string.');
  }

  try {
    const user = await db.models.User.findOne({
      where: {
        email: value,
      },
    });

    if (user) {
      return Promise.reject('A user with the provided email already exists.');
    }

    return;
  } catch (err) {
    return Promise.reject('Internal server error.');
  }
};
