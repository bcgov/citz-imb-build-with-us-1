const { usersQueries } = require("../queries");
const { passport } = require("../keycloak");

/**
 * Keycloak authenticate.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /auth/authenticate
 */
exports.authenticate = (req, res, next) => {
  try {
    passport.authenticate("oidc")(req, res, next);
  } catch (error) {
    console.error("Controller: Error in authenticate", error);
  }
};

/**
 * Keycloak logout.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /auth/logout
 */
exports.logout = (req, res) => {
  try {
    req.session.destroy();
    const retUrl = `${process.env.SSO_AUTH_SERVER_URL}/realms/${
      process.env.SSO_REALM
    }/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
      process.env.SSO_LOGOUT_REDIRECT_URI
    )}&id_token_hint=${tokenset.id_token}`;
    res.redirect(
      `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
        retUrl
      )}`
    );
  } catch (error) {
    console.error("Controller: Error in logout", error);
  }
};

/**
 * Activate user (create user if they dont exist).
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /auth/activate
 */
exports.activate = async (req, res) => {
  try {
    const decoded = req.session.passport.user;

    // Get user from database matching the user guid on the keycloak jwt.
    const user = await usersQueries.getUserById(decoded.idir_user_guid)[0];

    if (!user) {
      // No such user exists, create new user.
      const createdUser = await usersQueries.createUser(
        decoded.idir_user_guid,
        null,
        null
      )[0];

      if (!createdUser) res.status(400).send("User could not be created."); // Bad request.
    }

    res.status(200).send("User activated.");
  } catch (error) {
    console.error("Controller: Error in activate", error);
  }
};

