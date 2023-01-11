# Routes
Exported as routers, which are used in the main express.js file.  
Handles each endpoint, such as `users` of `http://localhost:5005/users`.

## Examples
Use these example to create new routes.  
Be sure to edit the comments and HTTP methods.

``` JavaScript
/**
 * Get all users.
 * @method GET
 */
router.get('/', usersController.get_all_users);

/**
 * Get user by id.
 * @method GET
 * @param id - User GUID, a unique identifier for a user.
 */
router.get('/:id', usersController.get_user);

/**
 * Create user.
 * @method POST
 */
router.post('/', usersController.create_user);
```

``` Diff
+ Explanation...
```
- These routes are exported as `router` from `backend/routes/users.js` and used by `express.js`.
- They each start with `router.<method>` where `<method>` is an HTTP method such as `get`, `post`, `put`, `delete`, etc.
- The first parameter is the endpoint path.  
The main endpoint path is `/users` of `http://localhost:5005/users` which is set in `express.js` on the `usersRouter`.  
Here on each route, `/` would mean `/users` and `/:id` would mean `/users/:id`.
- The second parameter is a controller, which is just a function.

## Creating New Router Files
1. Create a new file in the `routes` directory like `users.js`.
2. Ensure it imports `const express = require('express');` and `const router = express.Router();` at the top of the file.
3. Ensure it exports `module.exports = router;` at the bottom of the file.
4. Export the router in `backend/routes/index.js` like `exports.usersRouter = require('./users');`.
5. Import the router into `express.js` on the line that looks like `const { usersRouter } = require('./routes');`. Use the name of the export you defined in step 4.
6. Near the bottom of `express.js`, add the router like `app.use('/users', usersRouter);`, defining the endpoint like `/users`.
