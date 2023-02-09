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
