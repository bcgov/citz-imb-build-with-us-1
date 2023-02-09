const db = require('../database/connection');

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @returns all rows from user table.
 */
exports.getUsers = async () => db.query('SELECT * FROM "user"');

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @param {string} id - User GUID, a unique identifier for a user.
 * @returns first row matching specified id to guid column in user table.
 */
exports.getUserById = async (id) => db.query('SELECT * FROM "user" WHERE guid = $1', [id]);

/**
 * Create user.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method POST
 * @param {string} guid - User GUID, a unique identifier for a user.
 * @param {number} group_id - A unique identifier for a group. Look at database/init/02-create_groups.sql
 * @param {string} job_role - A user's job position.
 * @returns row of inserted user.
 */
exports.createUser = async (guid, group_id, job_role) => 
  db.query('INSERT INTO "user" (guid, group_id, job_role) VALUES ($1, $2, $3)', 
    [guid, group_id, job_role]);
