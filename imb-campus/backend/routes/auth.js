const express = require("express");
const { authController } = require("../controllers");
const router = express.Router();

/**
 * Prompts the user to login.
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/login
 */
router.get("/login", authController.login);

/**
 *
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/login/callback
 */
router.get("/login/callback", authController.callback);

/**
 *
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/logout
 */
router.get("/logout", authController.logout);

/**
 *
 * @author Zach Bourque <Zachary.Bourque@gov.bc.ca>
 * @method GET
 * @route /oauth/logout/callback
 */
router.get("/logout/callback", authController.logoutCallback);

module.exports = router;
