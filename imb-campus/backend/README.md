# IMBoarding Backend

<img src="https://user-images.githubusercontent.com/16313579/211708283-6ba849b8-bca2-425e-a2e6-8f213c9b7f89.PNG">

## Table of Contents

- [General Information](#general-information)
- [Directory Structure](#directory-structure)
- [Keycloak Authentication](#keycloak-authentication)
- [Authenticating an Endpoint](#authenticating-an-endpoint)
- [Authorization on an Endpoint](#authorization-on-an-endpoint)
- [Making a Request to the API](#making-a-request-to-the-api)

## General Information

- Running on Node-18 and docker image [node:18.12.1-bullseye-slim].
- [REST API] through the use of [Express] Framework.
- Using [node-postgres] to interface the connection between the Backend and Postgres Database.
- Using [nodemon] in local development to hot-reload (refresh the Backend when changes are made to the code).
- Start the backend containers using `docker compose up imbc-database imbc-backend`.

## Directory Structure

```JavaScript
backend/
|─ controllers/ // Used by routes. Most of an endpoint's functionality happens here.
|  └─ index.js // Allows all controllers to be exported from the controllers directory.
|
|─ queries/ // Used by controllers. Functions that run database queries.
|  └─ index.js // Allows all queries to be exported from the queries directory.
|
|─ routes/ // Exported as routers, which are used in the main express.js file.
|  └─ index.js // Allows all routers to be exported from the routes directory.
|
|─ database/
|  └─ connection.js // Where the API connects to the Postgres Database.
|  └─ migrations.js // Controls database migrations.
|  └─ migrations/ // Where migration scripts are located.
|
|─ middleware/
|  └─ index.js // Allows all functions to be exported from the middleware directory.
|  └─ protect.js // Exports middleware for protecting an endpoint with keycloak sso authentication.
|
|─ utils/
|  └─ index.js // Allows all functions to be exported from the utils directory.
|  └─ colors.js // Exports ANSI color codes as variables for use in console log statements.
|  └─ keycloak.js // Exports functions used in keycloak sso authentication.
|
|─ Dockerfile // Configuration for the Backend container.
|
|─ express.js // Where the API is created and configured. Controls middleware and routers.
|
|─ config.js // Exports environment variables and other configuration values.
|
|─ index.js // Where the server is started from.
```

<br/>

## Keycloak Authentication

The Keycloak Authentication system begins when the user visits the `/oauth/login` endpoint.

1. The user is redirected to the Keycloak Login Page for our application.
2. Upon successful login, they are redirected back to our app's `/oauth/login/callback` endpoint with an "authentication code".
3. Using this authentication code, our api reaches out to Keycloak on our user's behalf and retrieves them an [access token](https://auth0.com/docs/secure/tokens/access-tokens), and a [refresh token](https://developer.okta.com/docs/guides/refresh-tokens/main/).
4. The user is redirected back to the frontend with an access token within the query parameters, and a refresh token as an httpOnly cookie.

<br/>

## Authenticating an Endpoint

Require keycloak authentication before using an endpoint.
Import `protect` from `imb-campus/backend/middleware` and add as middleware.

Example from `imb-campus/backend/express.js`:

```JavaScript
const { protect } = require("./middleware");

app.use("/users", protect, usersRouter);
```

<br/>

## Authorization on an Endpoint

Get the keycloak user info in a protected endpoint.  
`req.user` is either populated or null and the `client_roles` property is either a populated array or undefined.

Example:

```JavaScript
const user = req.user;
if (!user) res.status(404).send("User not found.");
```

Example req.user object:

```JSON
{
  idir_user_guid: 'W7802F34D2390EFA9E7JK15923770279',
  identity_provider: 'idir',
  idir_username: 'JOHNDOE',
  name: 'Doe, John CITZ:EX',
  preferred_username: 'a7254c34i2755fea9e7ed15918356158@idir',
  given_name: 'John',
  display_name: 'Doe, John CITZ:EX',
  family_name: 'Doe',
  email: 'john.doe@gov.bc.ca',
  client_roles: ['admin'],
}
```

<br/>

## Making a Request to the API

There are many ways to interact with the API, but one of the easiest is through a VSCode Extension called [Thunder Client].

### Installing Thunder Client in VSCode

<img width="750" src="https://user-images.githubusercontent.com/16313579/211705502-8dfda961-fbcd-481b-b7ac-089f6b1a4391.PNG">

1. Go to the **Extensions** tab or use shortcut `CTRL+Shift+X`.
2. Search `Thunder Client` and click on the one by `Ranga Vadhineni`.
3. Click **Install**.
4. Once installed, you can find it in your left-hand navigation menu as a thunderbolt icon.

### Using Thunder Client to Make a Request

<img width="750" src="https://user-images.githubusercontent.com/16313579/211705518-272175d6-869b-4fbf-836d-b2729812615a.PNG">

1. Open **Thunder Client** tab.
2. Click **New Request** at the top of the window.
3. Select the request **Method** you want to make, by default this is `GET`.
4. Change the address to `http://localhost:5005/`. **NOTE**: `5005` is the default port for the backend set in the `.env` file.
5. Add the endpoint to the address that you are trying to reach, such as `users`, as in `http://localhost:5005/users`.
6. If you are making a `POST` request that requires a request body, add the JSON object under the **Body** tab.
7. If the endpoint you are trying to reach is protected, you need to add the access token for keycloak under **Auth** > **Bearer**. You can find this in the url of the frontend once you have logged in. **Access token**: `/?token=<access-token>`.
8. Click **Send**. The response and status code will show up on the right side of the window.

<!-- Link References -->

[node:18.12.1-bullseye-slim]: https://hub.docker.com/layers/library/node/18.12.1-bullseye-slim/images/sha256-0c3ea57b6c560f83120801e222691d9bd187c605605185810752a19225b5e4d9?context=explore
[rest api]: https://www.redhat.com/en/topics/api/what-is-a-rest-api
[express]: http://expressjs.com/
[node-postgres]: https://node-postgres.com/
[nodemon]: https://nodemon.io/
[thunder client]: https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client
