const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");

/**
 * Keycloak authenticate. Activate user (create user if they dont exist).
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /auth/autenticate
 */
router.get(
  "/authenticate",
  authController.authenticate,
  authController.activate
);

/**
 * Keycloak logout.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /auth/logout
 */
router.get("/logout", authController.logout);

/**
 * Activate user (create user if they dont exist).
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @method GET
 * @route /auth/activate
 */
router.get("activate", authController.activate);

module.exports = router;

