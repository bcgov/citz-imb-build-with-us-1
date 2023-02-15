const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
// Import routers
const {
  usersRouter,
  journeyRouter,
  healthRouter,
  authRouter,
} = require("./routes");
const { protect } = require("./middleware");
const { FRONTEND_URL } = require("./config");

// Define Express App
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: FRONTEND_URL,
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

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
app.get("/", (req, res) => res.send("Express Server is live!"));
app.use("/oauth", authRouter);
app.use("/users", protect, usersRouter);
app.use("/journey", protect, journeyRouter);
app.use("/health", healthRouter);

module.exports = app;
