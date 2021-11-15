module.exports = (req, res, next) => {
  console.log('Is Authenticated: ', req.isAuthenticated());

  next();
};
