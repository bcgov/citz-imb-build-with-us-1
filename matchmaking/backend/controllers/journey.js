const { journeyQueries } = require('../queries');

/**
 * Get journey by user id.
 * @author Brandon Bouchard <brandon.bouchard@gov.bc.ca
 * @method GET
 * @param {string} id - User GUID, a unique identifier for a user.
 */
exports.get_journey = async (req, res) => {
  try {
    const journey = await journeyQueries.getJourneyByUserId(req.params.id);

    if (journey) res.status(200).json(journey);
    else res.status(404).send('Journey not found.');
  } catch (error) {
    console.error('Controller: Error in get_journey', error);
  }
};
