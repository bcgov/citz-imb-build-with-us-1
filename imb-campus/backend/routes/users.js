const express = require("express");
const router = express.Router();
const upload = require("../middleware");
const { usersController } = require("../controllers");

/**
 * Get all users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users
 */
router.get("/", usersController.get_all_users);

/**
 * Get discovered users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/discovered
 */
router.get("/discovered", usersController.get_discovered_users);

/**
 * Get undiscovered users.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/undiscovered
 */
router.get("/undiscovered", usersController.get_undiscovered_users);

/**
 * Add discovered user.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method PUT
 * @route /users/discovered/<id>
 */
router.put("/discovered/:id", usersController.add_discovered_user);

/**
 * Get user by id.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /users/<id>
 * @param id - User GUID, a unique identifier for a user.
 */
router.get("/:id", usersController.get_user);

/**
 * Get profile image for user.
 * @author Grant Graham
 * @method GET
 * @route /users/profile-pic
 * 
 */
router.get("/profile-pic", usersController.get_profile_pic);

/**
 * Set/update profile image for user.
 * @author Grant Graham
 * @method PUT
 * @route /users/profile-pic
 * 
 */
router.put("/profile-pic", upload.single("file"), usersController.upload_profile_pic);

module.exports = router;
