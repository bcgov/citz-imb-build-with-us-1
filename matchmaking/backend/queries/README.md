# Queries
Used by controllers.  
Functions that run database queries. 

## Examples
Use these example to create new queries.  
Be sure to edit the comments and function names.

``` JavaScript
/**
 * Get all users.
 * @method GET
 * @returns all rows from user table.
 */
exports.getUsers = async () => await db.query('SELECT * FROM "user"');

/**
 * Get user by id.
 * @method GET
 * @returns first row matching specified id to guid column in user table.
 */
exports.getUserById = async (id) => await db.query('SELECT * FROM "user" WHERE guid = $1', [id]);
```

``` Diff
+ Explanation...
```
- These queries are used by controllers in `backend/controllers/users.js`.
- They are named and exported as `getUsers` and `getUserById`.
- The function `db.query()` takes in the query string as its first argument, and optionally takes parameters as its second argument.
- The second example uses a parameter of id, which is passed to the query function through to the `$1` as in the 1st parameter.
- It's required to be **async** because the query function needs to be **awaited**.

## Creating Query Files
1. Create a new file in the `queries` directory like `users.js`.
2. Ensure it imports `const db = require('../db-connection');` at the top of the file.
3. Export the queries in `backend/queries/index.js` like `exports.usersQueries = require('./users');`.
3. When you need to use the queries in a controller, import it like `const { usersQueries } = require('../queries');`.
