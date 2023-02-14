const { Pool } = require("pg");
const { colors } = require("../utils");
const pool = new Pool();

const connect = async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.error(
      `${colors.LBlue}PG: ${colors.Pink}Error in pool connection${colors.Reset}`,
      error
    );
  }
};
connect();

/**
 * Executes a query on the database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} queryString - SQL Query to execute on database.
 * @param {string[]} params - Parameters used in queryString.
 * @returns {object[]} - Rows from database table.
 */
exports.query = async (queryString, params) => {
  try {
    const { rows } = await pool.query(queryString, params);
    return rows;
  } catch (error) {
    console.error(
      `${colors.LBlue}PG: ${colors.Pink}Error in query${colors.Reset}`,
      { queryString },
      error
    );
  }
};

/**
 * Executes an sql file on the database.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} sqlFileData - Data read from an sql file using fs module.
 */
exports.querySQLScript = async (sqlFileData) => {
  try {
    let currentStatement = "";
    let statements = sqlFileData.split("\n");
    // Parse statements out of sql file.
    const parsedStatements = statements.reduce(
      (parsedStatements, statement) => {
        // Ignore empty lines and comments.
        if (
          statement.trim() === "" ||
          statement.trim().startsWith("--") ||
          statement.trim().toUpperCase().startsWith("BEGIN;") ||
          statement.trim().toUpperCase().startsWith("END;")
        )
          return parsedStatements;
        currentStatement += statement;
        if (statement.endsWith(";")) {
          parsedStatements.push(currentStatement);
          currentStatement = "";
        }
        return parsedStatements;
      },
      []
    );
    // Execute statements.
    for (let i = 0; i < parsedStatements.length; i++) {
      try {
        console.log(
          `${colors.LBlue}PG: ${colors.Reset}Executing statement`,
          parsedStatements[i]
        );
        exports.query(parsedStatements[i]);
      } catch (error) {
        console.error(
          `${colors.LBlue}PG: ${colors.Pink}Error executing SQL statement: ${colors.Reset}${parsedStatements[i]}`,
          error
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};
