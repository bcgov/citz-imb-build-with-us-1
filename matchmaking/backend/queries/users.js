const db = require('../db-connection');

/**
 * Get all users.
 * @method GET
 * @returns all rows from user table.
 */
exports.getUsers = async () => await db.query('SELECT * FROM "user"');

/**
 * Get user by id.
 * @method GET
 * @param {string} id - User GUID, a unique identifier for a user.
 * @returns first row matching specified id to guid column in user table.
 */
exports.getUserById = async (id) => await db.query('SELECT * FROM "user" WHERE guid = $1', [id]);

/**
 * Create user.
 * @method POST
 * @param {string} guid - User GUID, a unique identifier for a user.
 * @param {number} group_id - A unique identifier for a group. Look at database/init/02-create_groups.sql
 * @param {string} job_role - A user's job position.
 * @returns row of inserted user.
 */
exports.createUser = async (guid, group_id, job_role) => 
  await db.query('INSERT INTO "user" (guid, group_id, job_role) VALUES ($1, $2, $3)', 
    [guid, group_id, job_role]);
