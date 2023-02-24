const fs = require("fs");

/**
 * Checks for existing image and deletes it if found.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} user_guid - The user's unique identifier.
 * @returns {string | null} - Returns file name or null.
 */
const getImagePath = (user_guid) => {
  // Read the contents of the "images/" directory.
  fs.readdir("images/", (error, files) => {
    if (error) {
      console.log(error);
    } else {
      const fileName = null;
      // Loop through the files in the "images/" directory.
      for (const file of files) {
        if (file.startsWith(user_guid)) {
          // If the filename starts with the user guid, set fileName as file.
          fileName = file;
        }
      }
      return fileName;
    }
  });
};

exports.module = getImagePath;
