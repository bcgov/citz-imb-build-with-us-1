const fs = require("fs");
const path = require("path");
const { colors } = require("../utils");
const { migrationsQueries } = require("../queries");
const { querySQLScript } = require("./connection");

/**
 * Calls runMigrations if new migrations have been added since the last time the server started.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
exports.checkForNewMigrations = async () => {
  const { currentMigration, lastAddedMigration } = await setupMigrationTable();
  console.log(
    `${colors.Yellow}DB Migrations: ${colors.Reset}Checking for new migrations...`
  );
  if (currentMigration < lastAddedMigration)
    await runMigrations(currentMigration, lastAddedMigration);
};

/**
 * Calls readMigrationFiles for every new migration since the last time the server started.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {number} currentMigration - Comes from setupMigrationTable().
 * @param {number} lastAddedMigration - Comes from setupMigrationTable().
 */
const runMigrations = async (currentMigration, lastAddedMigration) => {
  const numMigrations = lastAddedMigration - currentMigration;
  console.log(
    `${colors.Yellow}DB Migrations: ${
      colors.Reset
    }Found ${numMigrations} migration(s), ${
      currentMigration + 1
    } to ${lastAddedMigration}...`
  );

  // Do each migration, one at a time.
  for (let migration = 1; migration <= numMigrations; migration++) {
    console.log(
      `${colors.Yellow}DB Migrations: ${colors.Reset}Running migration ${migration} of ${numMigrations}...`
    );
    await readMigrationFiles(currentMigration + migration);
    // Update the current migration number.
    const newCurrentMigrationValue = currentMigration + migration;
    await migrationsQueries.update("current", newCurrentMigrationValue);
  }
};

/**
 * Calls readMigrationFiles for every new migration since the last time the server started.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
const setupMigrationTable = async () => {
  try {
    console.log(
      `${colors.Yellow}DB Migrations: ${colors.Reset}Checking if migrations are set up...`
    );
    const totalMigrationsInProject = await countTotalMigrationsInProject();
    const tableExists = await migrationsQueries.tableExists();
    if (tableExists) {
      // Migration table already exists.
      console.log(
        `${colors.Yellow}DB Migrations: ${colors.Reset}Retrieving values from migration table in database...`
      );
      const currentMigration = await migrationsQueries.getValue("current");
      await migrationsQueries.update("lastAdded", totalMigrationsInProject);
      return { currentMigration, lastAddedMigration: totalMigrationsInProject };
    } else {
      // Create migration table.
      console.log(
        `${colors.Yellow}DB Migrations: ${colors.Reset}Creating migration table in database...`
      );
      await migrationsQueries.createTable();
      await migrationsQueries.insert("current", 0);
      await migrationsQueries.insert("lastAdded", totalMigrationsInProject);
      return {
        currentMigration: 0,
        lastAddedMigration: totalMigrationsInProject,
      };
    }
  } catch (error) {
    console.error(
      `${colors.Yellow}DB Migrations: ${colors.Pink}Error setting up migration table.${colors.Reset}`,
      error
    );
  }
};

/**
 * Calls querySQLScript with data from each sql file it finds for a single migration.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {number} migration - Which migration to target.
 */
const readMigrationFiles = async (migration) => {
  const baseDirectory = "./database/migrations/";
  let data = [];

  // Read migrations directory.
  fs.readdir(baseDirectory, (error, files) => {
    if (error) {
      console.error(
        `${colors.Yellow}DB Migrations: ${colors.Pink}Error reading migrations directory${colors.Reset}`,
        error
      );
      return;
    }

    // Look for directory starting with migrartion number.
    const sqlFilesPromises = files.map((file) => {
      // Remove any leading 0's from the file name.
      const fileRemovedLeadingZeros = file.replace(/^0+/, "");

      // If the file name starts with the migration number.
      if (fileRemovedLeadingZeros.startsWith(migration.toString())) {
        let filePath = path.join(baseDirectory, file);
        return new Promise((resolve, reject) => {
          fs.stat(filePath, (error, stat) => {
            if (error) {
              console.error(
                `${colors.Yellow}DB Migrations: ${colors.Pink}Error with path to migration directory${colors.Reset}`,
                error
              );
              reject(error);
            }

            if (stat.isDirectory()) {
              // Navigate down to the scripts directory.
              filePath = path.join(filePath, "scripts");
              fs.readdir(filePath, (error, files) => {
                if (error) {
                  console.error(
                    `${colors.Yellow}DB Migrations: ${colors.Pink}Error reading migration directory at path ${colors.Reset}${filePath}`,
                    error
                  );
                  reject(error);
                }

                // For each file in directory that is an SQL file.
                files.forEach((file) => {
                  if (file.endsWith(".sql")) {
                    // Read SQL File.
                    fs.readFile(
                      path.join(filePath, file),
                      "utf8",
                      (error, fileData) => {
                        console.log(
                          `${colors.Yellow}DB Migrations: ${colors.Reset}Reading file`,
                          file
                        );
                        if (error) {
                          console.error(
                            `${colors.Yellow}DB Migrations: ${colors.Pink}Error reading file at ${colors.Reset}${filePath}`,
                            error
                          );
                          reject(error);
                        }
                        data.push(fileData);
                        // Check if all the files have been processed.
                        if (data.length === files.length) {
                          resolve(data);
                        }
                      }
                    );
                  }
                });
              });
            }
          });
        });
      }
    });

    Promise.all(sqlFilesPromises)
      .then(async (sqls) => {
        // Process all sql files here.
        sqls = sqls.filter((value) => value !== undefined)[0];

        if (Array.isArray(sqls))
          sqls.forEach(async (sql) => querySQLScript(sql));
        else querySQLScript(sqls);
      })
      .catch(console.error);
  });
};

/**
 * Counts the number of directories in the "./database/migrations/" directory.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @returns Count of migration directories in the project.
 */
const countTotalMigrationsInProject = async () => {
  let directoryCount = 0;
  const baseDirectory = "./database/migrations/";

  return new Promise((resolve, reject) => {
    fs.readdir(baseDirectory, (error, files) => {
      if (error) {
        console.error(`Error reading migrations directory: ${error}`);
        reject(error);
        return;
      }

      // Map each file in the directory to a Promise that resolves when its stat information is retrieved.
      const promises = files.map((file) => {
        const filePath = `${baseDirectory}${file}`;
        return new Promise((resolve, reject) => {
          fs.stat(filePath, (error, stat) => {
            if (error) {
              console.error(`Error getting file stat: ${error}`);
              reject(error);
              return;
            }

            if (stat.isDirectory()) {
              directoryCount++; // Increment the count of directories.
            }
            resolve(); // Resolve the Promise.
          });
        });
      });

      // Wait for all of the file stat information to be retrieved.
      Promise.all(promises)
        .then(() => {
          console.log("Migrations found in project", directoryCount);
          resolve(directoryCount); // Resolve the Promise with the count of directories.
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
