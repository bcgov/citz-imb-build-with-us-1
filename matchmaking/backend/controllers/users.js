const crypto = require('crypto');
const { usersQueries } = require('../queries');

/**
 * Get all users.
 * @method GET
 */
exports.get_all_users = (req, res) => {
  try {
    const users = usersQueries.getUsers().rows;

    if (users) res.status(200).json(users); // Success, return users.
    else res.status(404).send('Users not found.'); // Users not found.
  } catch (error) {
    console.error('Controller: Error in get_all_users', error);
  }
};

/**
 * Get user by id.
 * @method GET
 */
exports.get_user = (req, res) => {
  try {
    const user = usersQueries.getUserById(req.params.id).rows[0];

    if (user) res.status(200).json(user); // Success, return user.
    else res.status(404).send('User not found.'); // User not found.
  } catch (error) {
    console.error('Controller: Error in get_user', error);
  }
};

/**
 * Create user.
 * @method POST
 */
exports.create_user = (req, res) => {
  try {
    if (!req.body.group_id || !req.body.job_role) 
      res.status(400).send('Must include group_id and job_role in request body.'); // Bad request.
    const { group_id, job_role } = req.body;

    // Generate guid and make sure its not already in use.
    const guid = crypto.randomUUID();
    const user = usersQueries.createUser(guid, group_id, job_role).rows[0];

    if (user) res.status(201).json(user); // Success, return user.
    else res.status(400).send('User could not be created.'); // Bad request.
  } catch (error) {
    console.error('Controller: Error in create_user', error);
  }
};
