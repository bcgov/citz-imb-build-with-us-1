const express = require('express');
const router = express.Router();

/**
 * Get user by id.
 * @method GET
 */
router.get('/', (req, res) => {
    res.send('Application is super healthy!')
});

module.exports = router;
