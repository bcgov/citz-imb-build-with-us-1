const { getUserData } = require("./keycloak");
const { usersQueries } = require("../queries");

/**
 * Adds user to database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
const activateUser = async (access_token) => {
  try {
    const user = await getUserData(access_token);
    if (user == null) console.error("Activate: User not found.");
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

module.exports = activateUser;
