const db = require("../database/connection");

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @returns all rows from user table.
 */
exports.getUsers = async () => db.query('SELECT * FROM "user"');

/**
 * Get discovered users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @returns all rows from user table where user is a discovered user in discovered_user table.
 */
exports.getDiscoveredUsers = async (guid) =>
  db.query('SELECT * FROM "discovered_user" WHERE user_guid = $1', [guid]);

/**
 * Get undiscovered users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @returns all rows from user table where user is not a discovered user in discovered_user table.
 */
exports.getUndiscoveredUsers = async (guid) =>
  db.query(
    `SELECT u.* FROM "user" u
LEFT JOIN discovered_user du ON du.discovered_user_guid = u.guid
WHERE du.discovered_user_guid IS NULL AND du.user_guid = $1`,
    [guid]
  );

/**
 * Add discovered user.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method PUT
 */
exports.addDiscoveredUser = async (user_guid, discovered_user_guid) =>
  db.query(
    'INSERT INTO "discovered_user" (user_guid, discovered_user_guid) VALUES ($1, $2)',
    [user_guid, discovered_user_guid]
  );

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @param {string} id - User GUID, a unique identifier for a user.
 * @returns first row matching specified id to guid column in user table.
 */
exports.getUserById = async (id) =>
  db.query('SELECT * FROM "user" WHERE guid = $1', [id]);

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
  db.query(
    'INSERT INTO "user" (guid, group_id, job_role) VALUES ($1, $2, $3)',
    [guid, group_id, job_role]
  );
