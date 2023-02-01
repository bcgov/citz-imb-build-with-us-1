const express = require("express");
const router = express.Router();
const { usersController } = require("../controllers");

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users
 */
router.get("/", usersController.get_all_users);

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/<id>
 * @param id - User GUID, a unique identifier for a user.
 */
router.get("/:id", usersController.get_user);

module.exports = router;
