# IMBoarding Database

<img src="https://user-images.githubusercontent.com/16313579/211710903-d9d949f0-3562-41b2-8aa6-ba0665c37535.PNG">

## Table of Contents
- [General Information](#general-information)
- [Schema](#schema)
- [Connecting with PG Admin](#connecting-with-pg-admin)

## General Information
- Running on docker image [postgres:14.5-alpine](https://hub.docker.com/layers/library/postgres/14.5-alpine/images/sha256-db802f226b620fc0b8adbeca7859eb203c8d3c9ce5d84870fadee05dea8f50ce?context=explore).
- Locally configured within `./docker-compose.yaml` under service `matchmaking-database`.
- Locally, data is persisted with docker volume `matchmaking-database-data`.
- Locally, initialized with sql scripts found in `./matchmaking/database/init`.

## Schema

<img src="https://user-images.githubusercontent.com/16313579/211712933-44fc33f6-3a06-4cdc-a6dc-f3e528e0fa31.PNG">

## Connecting with PG Admin
PG Admin is a GUI tool used to interact with Postgres database sessions.

### Connecting to Local Database on PG Admin

1. Download [PG Admin 4](https://www.pgadmin.org/download/).
2. Right click on **Servers**, select **Register** > **Server**.
3. Name it `IMBoarding`.
4. Click on the **connection** tab.
5. Set **Host** to `localhost`, and **Port** to `5009`. **NOTE**: `5009` is the default port for the database set in the `.env` file.
6. Set **User** to `postgres` and **Password** to `postgres`. **NOTE**: These are the default values set in the `.env` file.
7. Select **Save password** option.
8. Save.

### Using PG Admin for Local Database

- Find tables under **IMBoarding** > **Databases** > **matchmaking** > **Schemas** > **public** > **Tables**.
- View a tables rows by right clicking a table and selecting **View/Edit Data** > **All Rows**.
