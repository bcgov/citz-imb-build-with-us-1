const { usersQueries } = require("../queries");

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users
 */
exports.get_all_users = async (req, res) => {
  try {
    const users = await usersQueries.getUsers();

    if (users) res.status(200).json(users); // Success, return users.
    else res.status(404).send("Users not found."); // Users not found.
  } catch (error) {
    console.error("Controller: Error in get_all_users", error);
  }
};

/**
 * Get discovered users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/discovered
 */
exports.get_discovered_users = async (req, res) => {
  try {
    const user_guid = req.session.passport.user.idir_user_guid; // User who made the request.
    const users = await usersQueries.getDiscoveredUsers(user_guid);

    if (users) res.status(200).json(users); // Success, return users.
    else res.status(404).send("Users not found."); // Users not found.
  } catch (error) {
    console.error("Controller: Error in get_discovered_users", error);
  }
};

/**
 * Get undiscovered users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/undiscovered
 */
exports.get_undiscovered_users = async (req, res) => {
  try {
    const user_guid = req.session.passport.user.idir_user_guid; // User who made the request.
    const users = await usersQueries.getUndiscoveredUsers(user_guid);

    if (users) res.status(200).json(users); // Success, return users.
    else res.status(404).send("Users not found."); // Users not found.
  } catch (error) {
    console.error("Controller: Error in get_undiscovered_users", error);
  }
};

/**
 * Add a discovered user.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method PUT
 * @route /users/discovered/<id>
 */
exports.add_discovered_user = async (req, res) => {
  try {
    const user_guid = req.session.passport.user.idir_user_guid; // User who made the request.
    const user = await usersQueries.addDiscoveredUser(user_guid, req.params.id);

    if (user)
      res.status(204).send("User added to discovered_user table."); // Success.
    else res.status(404).send("User could not be added."); // Users not found.
  } catch (error) {
    console.error("Controller: Error in add_discovered_user", error);
  }
};

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/<id>
 * @param {string} id - User GUID, a unique identifier for a user.
 */
exports.get_user = async (req, res) => {
  try {
    const users = await usersQueries.getUserById(req.params.id);

    if (users[0]) res.status(200).json(users[0]); // Success, return user.
    else res.status(404).send("User not found."); // User not found.
  } catch (error) {
    console.error("Controller: Error in get_user", error);
  }
};
