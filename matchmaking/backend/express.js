const express = require("express");
const session = require("express-session");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const passport = require("passport");
const {
  initKeycloak,
  initKeycloakStrategy,
  checkAuthenticated,
} = require("./keycloak");

// Import routers
const { authRouter, usersRouter, healthRouter } = require("./routes");

// Define Express App
const app = express();

// Cors origin
const corsOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_REF
    : `http://${process.env.FRONTEND_REF}:${process.env.FRONTEND_PORT}`;

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

// Initialize Keycloak
const store = new session.MemoryStore();

app.set("view engine", "ejs");
app.use(express.json());
app.use(
  session({
    secret: process.env.SSO_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
    store,
  })
);
app.use(express.urlencoded({ extended: false }));

(async () => {
  const keycloakClient = await initKeycloak();

  //Passport Middlewares
  app.use(passport.initialize());
  app.use(passport.session());

  initKeycloakStrategy(keycloakClient);
})();

// Routing
app.get("/", (req, res) => res.send("Express Server is live!"));
app.use("/auth", authRouter);
app.use("/users", checkAuthenticated, usersRouter);
app.use("/health", healthRouter);

module.exports = app;
