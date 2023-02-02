const passport = require("passport");
const { Issuer, Strategy } = require("openid-client");

/**
 * Uses the OpenID-Client library to discover the Keycloak issuer, i.e. the Keycloak authorization server.
 * Then creates a Keycloak client instance with the provided client id, client secret, and redirect URIs.
 */
const initKeycloak = async () => {
  const keycloakIssuer = await Issuer.discover(
    `${process.env.SSO_AUTH_SERVER_URL}/realms/${process.env.SSO_REALM}/.well-known/openid-configuration`
  );

  const keycloakClient = new keycloakIssuer.Client({
    client_id: process.env.SSO_CLIENT_ID,
    client_secret: process.env.SSO_CLIENT_SECRET,
    redirect_uris: ["http://localhost:3000/auth/callback"],
    response_types: ["code"],
  });

  return keycloakClient;
};

/**
 * Uses the passport library to set up an OpenID Connect (OIDC) strategy using the Keycloak client.
 * This strategy is used to authenticate users.
 * The tokenset object is used to store the tokens returned by the Keycloak server after a successful authentication.
 * The serializeUser and deserializeUser methods are used to store and retrieve user data from a session.
 * @param {openid client instance} keycloakClient - Created in initKeycloak.
 */
const initKeycloakStrategy = (keycloakClient) => {
  let tokenset = {};

  passport.use(
    "oidc",
    new Strategy({ client: keycloakClient }, (tokenSet, userinfo, done) => {
      tokenset = tokenSet;
      return done(null, tokenSet.claims());
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

/**
 * Middleware function that checks if the user is authenticated.
 * If the user has a valid session, the request is allowed to proceed,
 * otherwise a 401 Unauthorized response is sent.
 */
const checkAuthenticated = (req, res, next) => {
  if (req?.session?.passport?.user) {
    return next();
  }
  res.status(401).send("Unauthorized. Requires keycloak login.");
};

module.exports = {
  checkAuthenticated,
  initKeycloak,
  initKeycloakStrategy,
  passport,
};

