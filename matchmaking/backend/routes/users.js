const express = require('express');
const router = express.Router();

const { usersController } = require('../controllers');

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 */
router.get('/', usersController.get_all_users);

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @param id - User GUID, a unique identifier for a user.
 */
router.get('/:id', usersController.get_user);

/**
 * Create user.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method POST
 * @body Request body requires group_id and job_role.
 */
router.post('/', usersController.create_user);

module.exports = router;
