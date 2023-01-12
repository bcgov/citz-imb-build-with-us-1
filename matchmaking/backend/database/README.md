# Matchmaking Backend - Database Connection

## Table of Contents
- [General Information](#general-information)
- [Directory Structure](#directory-structure)
- [Migrations](#migrations)
  - [Making a New Migration](#making-a-new-migration)
  - [Rules for Writing A Migration Script](#rules-for-writing-a-migration-script)

## General Information
- Using [node-postgres](https://node-postgres.com/) to interface the connection between the Backend and Postgres Database.
- Connection options are set in the `docker-compose.yaml` under `matchmaking-backend` as environment variables.

## Directory Structure

``` JavaScript
backend/database/
> migrations/ // All database migrations are stored here.
| > {migration-number}-{migration-name}/ // A single migration.
| | > scripts/ // Includes sql scripts run by the migration.
|
> connection.js // Where the Backend connects to the Database and where queries are executed.
|
> migrations.js // Controls the running of migrations.
|
> migrations.json // Details about which migrations have been ran. Used by migrations.js when checking for new migrations.
```

## Migrations
Migrations allow us to edit/add data to the database.  
If there are new migrations added and then the backend server restarts, it will run the new migrations before the server starts.  

### Making a New Migration

``` Diff
! There is plans to make commands that automate most of this process.
```

_**Example:**_

``` JavaScript
backend/database/migrations/
> 001-Example/
| > scripts/
| | > example.sql
| | > example2.sql
```

1. Create a new migration directory inside `backend/database/migrations/` with the name of `<number>-<name>`, where `<number>` is the last migration number incremented by 1, and `<name>` is something descriptive. _Leading zeros are fine._
2. Create a `scripts` directory inside the directory you just created.
3. Place all your `sql` scripts inside the `scripts` directory. They will not execute in order, but statements within each file will execute in order. Only include sql statements in these files, end each statement with a semi-colon, and comments and newlines are allowed.
4. Increment the `lastAddedMigration` property of `backend/database/migrations.json` by 1.
5. Restart the backend container to run the migration.

### Rules for Writing A Migration Script
_**Example:**_

``` SQL
-- Example1
INSERT INTO public."group" (id, name, leader_guid) 
VALUES (24, 'Example1', null);

-- Example2
INSERT INTO public."group" (id, name, leader_guid) 
VALUES (25, 'Example2', null);
```

- Only `.sql` files within the `scripts/` directory will be run by the migration.
- Only write sql statements in the `sql` files.
- End sql statements with a semi-colon.
- Comments are allowed. Comments in sql start with `--`.
- Newlines between statements are allowed.
