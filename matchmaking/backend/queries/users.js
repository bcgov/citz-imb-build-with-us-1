const db = require('../db-connection');

/**
 * Get all users.
 * @method GET
 * @returns all rows from user table.
 */
exports.getUsers = async () => await db.query('SELECT * FROM user');

/**
 * Get user by id.
 * @method GET
 * @returns first row matching specified id to guid column in user table.
 */
exports.getUserById = async (id) => await db.query('SELECT * FROM user WHERE guid = $id', [id]);

/**
 * Create user.
 * @method POST
 * @returns row of inserted user.
 */
exports.createUser = async (guid, group_id, job_role) => 
  await db.query('INSERT INTO user (guid, group_id, job_role) VALUES ($guid, $group_id, $job_role)', 
    [guid, group_id, job_role]);
