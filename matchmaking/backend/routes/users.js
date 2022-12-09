const express = require('express');
const router = express.Router();

const { usersController } = require('../controllers');

/**
 * Get user by id.
 * @method GET
 */
router.get('/:id', usersController.get_user);

module.exports = router;
