const express = require('express');
const router = express.Router();

const { journeyController } = require('../controllers');

/**
 * Get user by id.
 * @author Brandon Bouchard <brandon.bouchard@gov.bc.ca
 * @method GET
 * @param id - User GUID, a unique identifier for a user.
 */
router.get('/:id', journeyController.get_journey);

module.exports = router;
