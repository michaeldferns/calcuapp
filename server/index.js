const cors = require('cors');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const passport = require('passport');
const routes = require('./routes');
const db = require('./db');
const isAuthenticated = require('./middlewares/isAuthenticated');
require('./utils/passport');

// Setup Express application
const app = express();

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize DB
db.sync({ force: true });

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

app.listen(3001, () => {
  console.log('server running on port 3000...');
});
