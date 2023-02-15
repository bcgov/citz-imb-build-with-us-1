const { FRONTEND_URL } = require("../config");
const { keycloak } = require("../utils");
const { usersQueries } = require("../queries");
const { getAccessToken, getAuthorizationUrl, getLogoutUrl, getUserData } =
  keycloak;

/**
 * Prompts the user to login.
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/login
 */
exports.login = async (req, res) => {
  try {
    if (req.token) {
      res.redirect(``);
    } else {
      const baseURL = `${req.protocol}://${req.get("host")}`;
      const authUrl = await getAuthorizationUrl(baseURL);
      res.redirect(authUrl);
    }
  } catch (error) {
    console.error("Controller: Error in login", error);
    res.json({ success: false, error: error.message || error });
  }
};

/**
 * Redirects user to the frontend, with an access and refresh token.
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/login/callback
 */
exports.callback = async (req, res) => {
  try {
    const { code } = req.query;
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const tokens = await getAccessToken({ code, baseURL });
    const redirectUrl = new URL(FRONTEND_URL);
    redirectUrl.searchParams.set("token", tokens.access_token);
    await activate(tokens.access_token);
    res
      .cookie("refresh_token", tokens.refresh_token, { httpOnly: true })
      .redirect(redirectUrl);
  } catch (error) {
    console.error("Controller: Error in login callback", error);
    res.json({ success: false, error: error.message || error });
  }
};

/**
 * Adds user to database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
const activate = async (access_token) => {
  try {
    const user = getUserData(access_token);
    if (!user) console.error("Activate: User not found.");
    else {
      // Get user from database matching the user guid on the keycloak jwt.
      const dbUser = await usersQueries.getUserById(user.idir_user_guid)[0];

      if (dbUser === undefined) {
        // No such user exists, create new user.
        const createdUser = await usersQueries.createUser(
          user.idir_user_guid,
          null,
          null
        )[0];

        if (!createdUser) console.error("Activate: User could not be created.");
      }
    }
  } catch (error) {
    console.error("Controller: Error in activate", error);
  }
};

/**
 * Logs out the user and, once finished, redirects them to /oauth/logout/callback
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/logout
 */
exports.logout = (req, res) => {
  try {
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const logoutUrl = getLogoutUrl(baseURL);
    res.redirect(logoutUrl);
  } catch (error) {
    console.error("Controller: Error in logout", error);
    res.json({ success: false, error: error.message || error });
  }
};

/**
 * Removes the user's httpOnly refresh token, and redirects back to the frontend.
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/logout/callback
 */
exports.logoutCallback = (req, res) => {
  res.cookie("refresh_token", "", { httpOnly: true }).redirect(FRONTEND_URL);
};
