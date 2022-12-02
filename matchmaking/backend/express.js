const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

// Define Express App
const app = express();

// Middleware
app.use(cors());

// Cors origin
const corsOrigin = process.env.MATCHMAKING_NODE_ENV === 'production'
  ? process.env.MATCHMAKING_FRONTEND_REF
  : `http://${process.env.MATCHMAKING_FRONTEND_REF}:${process.env.MATCHMAKING_FRONTEND_PORT}`;

// Routing
app.get("/", (req, res) => res.send("Express Server is live!"));

module.exports = app;
