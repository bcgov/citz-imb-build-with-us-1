const db = require("../database/connection");

/**
 * Check if the migration table exists.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @returns Returns true if table exists, false if it doesnt.
 */
exports.tableExists = async () => {
  const results = await db.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'migration'"
  );
  if (results.length > 0) return true;
  return false;
};

/**
 * Create the migration table.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
exports.createTable = async () =>
  db.query("CREATE TABLE IF NOT EXISTS migration (field text, value integer)");

/**
 * Insert into the migration table.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} field - The key of a key-value pair.
 * @param {number} value - The value of a key-value pair.
 */
exports.insert = async (field, value) =>
  db.query("INSERT INTO migration (field, value) VALUES ($1, $2)", [
    field,
    value,
  ]);

/**
 * Update a field in the migration table.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} field - The key of a key-value pair.
 * @param {number} value - The value of a key-value pair.
 */
exports.update = async (field, value) =>
  db.query("UPDATE migration SET value = $2 WHERE field = $1", [field, value]);

/**
 * Given a field, get the value, from the migration table.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} field - The key of a key-value pair.
 */
exports.getValue = async (field) => {
  const results = await db.query(
    "SELECT value FROM migration WHERE field = $1",
    [field]
  );
  return results[0].value;
};

