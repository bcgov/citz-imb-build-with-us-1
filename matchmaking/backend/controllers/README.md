# Controllers
Used by routes.  
Controllers are where most of an endpoint's functionality is.  
Basically just a fancy function that gets called by a route.

## Example
Use this example to create a new controller.  
Be sure to edit the comment and controller name.

``` JavaScript
/**
 * Get all users.
 * @method GET
 */
exports.get_all_users = async (req, res) => {
  try {
    const users = await usersQueries.getUsers();

    if (users) res.status(200).json(users); // Success, return users.
    else res.status(404).send('Users not found.'); // Users not found.
  } catch (error) {
    console.error('Controller: Error in get_all_users', error);
  }
};
```

``` Diff
+ Explanation...
```
- This controller is used by the `router.get('/', usersController.get_all_users);` route within `backend/routes/users.js`.
- It is named `get_all_users`.
- It uses a try-catch block to catch any errors that may occur within the controller, printing to console a useful error message if an error is caught.
- It utilizes the `userQueries.getUsers()` query to get all users from the database.
- It's required to be **async** because the query function needs to be **awaited**.

## Creating New Controller Files
1. Create a new file in the `controllers` directory like `users.js`.
2. Export the controller in `backend/controllers/index.js` like `exports.usersController = require('./users');`.
3. When you need to use the controller in a route, import it like `const { usersController } = require('../controllers');`.
