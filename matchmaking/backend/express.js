const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Import routers
const { usersRouter } = require('./routes');

// Define Express App
const app = express();

// Middleware
app.use(cors());
app.use(
  rateLimit({
    windowMs: 2 * 1000, // 2 seconds
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// Cors origin
const corsOrigin = process.env.MATCHMAKING_NODE_ENV === 'production'
  ? process.env.MATCHMAKING_FRONTEND_REF
  : `http://${process.env.MATCHMAKING_FRONTEND_REF}:${process.env.MATCHMAKING_FRONTEND_PORT}`;

// Routing
app.get('/', (req, res) => res.send('Express Server is live!'));
app.use('/users', usersRouter);

module.exports = app;
