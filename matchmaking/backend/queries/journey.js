const db = require('../database/connection');

/**
 * Get user by id.
 * @author Brandon Bouchard <brandon.bouchard@gov.bc.ca
 * @method GET
 * @param {string} id - User GUID, a unique identifier for a user.
 * @returns first row matching specified user_guid to journey column in user_journeys table.
 */
exports.getJourneyByUserId = async (id) => (await db.query('SELECT * FROM "user_journeys" WHERE user_guid = $1', [id]))[0];
