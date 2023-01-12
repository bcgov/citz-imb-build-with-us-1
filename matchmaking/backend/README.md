# IMBoarding Backend

<img src="https://user-images.githubusercontent.com/16313579/211708283-6ba849b8-bca2-425e-a2e6-8f213c9b7f89.PNG">

## Table of Contents
- [General Information](#general-information)
- [Directory Structure](#directory-structure)
- [Making a Request to the API](#making-a-request-to-the-api)

## General Information
- Running on Node-18 and docker image [node:18.12.1-bullseye-slim](https://hub.docker.com/layers/library/node/18.12.1-bullseye-slim/images/sha256-0c3ea57b6c560f83120801e222691d9bd187c605605185810752a19225b5e4d9?context=explore).
- [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) through the use of [Express](http://expressjs.com/) Framework.
- Using [node-postgres](https://node-postgres.com/) to interface the connection between the Backend and Postgres Database.
- Using [nodemon](https://nodemon.io/) in local development to hot-reload (refresh the Backend when changes are made to the code).

## Directory Structure

``` JavaScript
backend/
> controllers/ // Used by routes. Most of an endpoint's functionality happens here.
| > index.js // Allows all controllers to be exported from the controllers directory.
|
> queries/ // Used by controllers. Functions that run database queries.
| > index.js // Allows all queries to be exported from the queries directory.
|
> routes/ // Exported as routers, which are used in the main express.js file.
| > index.js // Allows all routers to be exported from the routes directory.
|
> database/
| > connection.js // Where the API connects to the Postgres Database.
| > migrations.js // Controls database migrations.
| > migrations.json // Keeps track of database migrations.
| > migrations/ // Where migration scripts are located.
|
> Dockerfile // Configuration for the Backend container.
|
> express.js // Where the API is created and configured. Controls middleware and routers.
|
> index.js // Where the server is started from.
```

## Making a Request to the API
There are many ways to interact with the API, but one of the easiest is through a VSCode Extension called [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client).

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
7. Click **Send**. The response and status code will show up on the right side of the window.
