const express = require('express');
const router = express.Router();

const { usersController } = require('../controllers');

/**
 * Get user by id.
 * @method GET
 */
router.get('/', usersController.get_all_users);
router.get('/:id', usersController.get_user);
router.post('/', usersController.create_user);

module.exports = router;
