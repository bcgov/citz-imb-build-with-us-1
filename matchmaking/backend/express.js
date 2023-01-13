const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

// Import routers
const { usersRouter, healthRouter } = require('./routes');

// Define Express App
const app = express();

// Cors origin
const corsOrigin = process.env.NODE_ENV === 'production'
  ? process.env.MATCHMAKING_FRONTEND_REF
  : `http://${process.env.MATCHMAKING_FRONTEND_REF}:${process.env.MATCHMAKING_FRONTEND_PORT}`;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 2 * 1000, // 2 seconds
    max: 100, // Limit each IP to 100 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// Routing
app.get('/', (req, res) => res.send('Express Server is live!'));
app.use('/users', usersRouter);
app.use('/health', healthRouter);

module.exports = app;
