const fs = require("fs");
const util = require("util");
const path = require("path");
const { colors } = require("../utils");
const {
  currentMigrationLocal,
  currentMigrationDev,
  currentMigrationTest,
  currentMigrationProd,
  lastAddedMigration,
} = require("./migrations.json");
const { querySQLScript } = require("./connection");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Check openshift environment/local development.
let currentMigration;
if ((process.env.ENVIRONMENT = "dev")) currentMigration = currentMigrationDev;
else if ((process.env.ENVIRONMENT = "test"))
  currentMigration = currentMigrationTest;
else if ((process.env.ENVIRONMENT = "prod"))
  currentMigration = currentMigrationProd;
else currentMigration = currentMigrationLocal;

/**
 * Calls runMigrations if new migrations have been added since the last time the server started.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
exports.checkForNewMigrations = async () => {
  console.log(
    `${colors.Yellow}DB Migrations: ${colors.Reset}Checking for new migrations...`
  );
  if (currentMigration < lastAddedMigration) await runMigrations();
};

/**
 * Calls readMigrationFiles for every new migration since the last time the server started.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 */
const runMigrations = async () => {
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
    // Update the migrations.json.
    if ((process.env.ENVIRONMENT = "dev")) {
      await updateJsonProperty(
        "currentMigrationDev",
        currentMigrationDev + migration
      );
    } else if ((process.env.ENVIRONMENT = "test")) {
      await updateJsonProperty(
        "currentMigrationTest",
        currentMigrationTest + migration
      );
    } else if ((process.env.ENVIRONMENT = "prod")) {
      await updateJsonProperty(
        "currentMigrationProd",
        currentMigrationProd + migration
      );
    } else {
      await updateJsonProperty(
        "currentMigrationLocal",
        currentMigrationLocal + migration
      );
    }
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
 * Update a JSON Property in migrations.json.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} propertyName - The name of the JSON property.
 * @param {*} newValue - The new value for the property.
 */
const updateJsonProperty = async (propertyName, newValue) => {
  try {
    // Read the file
    const data = await readFile("./database/migrations.json", "utf8");
    // Parse the JSON data
    let jsonData = JSON.parse(data);
    // Modify the property
    jsonData[propertyName] = newValue;
    // Write the data back to the file
    await writeFile(
      "./database/migrations.json",
      JSON.stringify(jsonData, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error(
      `${colors.Yellow}DB Migrations: ${colors.Pink}Error updating JSON File${colors.Reset}`,
      error
    );
  }
};
