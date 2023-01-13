const crypto = require('crypto');
const { usersQueries } = require('../queries');

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 */
exports.get_all_users = async (req, res) => {
  try {
    const users = await usersQueries.getUsers();

    if (users) res.status(200).json(users); // Success, return users.
    else res.status(404).send('Users not found.'); // Users not found.
  } catch (error) {
    console.error('Controller: Error in get_all_users', error);
  }
};

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @param {string} id - User GUID, a unique identifier for a user.
 */
exports.get_user = async (req, res) => {
  try {
    const users = await usersQueries.getUserById(req.params.id);

    if (users[0]) res.status(200).json(users[0]); // Success, return user.
    else res.status(404).send('User not found.'); // User not found.
  } catch (error) {
    console.error('Controller: Error in get_user', error);
  }
};

/**
 * Create user.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method POST
 * @body Request body requires group_id and job_role.
 */
exports.create_user = async (req, res) => {
  try {
    if (!req.body.group_id || !req.body.job_role) 
      res.status(400).send('Must include group_id and job_role in request body.'); // Bad request.
    const { group_id, job_role } = req.body;

    // Generate guid and make sure its not already in use.
    // TODO: Get guid from keycloak.
    const guid = crypto.randomUUID();
    const users = await usersQueries.createUser(guid, group_id, job_role);

    if (users[0]) res.status(201).json(users[0]); // Success, return user.
    else res.status(400).send('User could not be created.'); // Bad request.
  } catch (error) {
    console.error('Controller: Error in create_user', error);
  }
};
