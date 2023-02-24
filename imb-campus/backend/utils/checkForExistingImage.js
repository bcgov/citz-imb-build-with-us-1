const fs = require("fs");
const path = require("path");

/**
 * Checks for existing image and deletes it if found.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @param {string} user_guid - The user's unique identifier.
 */
const checkForExistingImage = (user_guid, callback) => {
  // Read the contents of the "images/" directory.
  fs.readdir("images/", (error, files) => {
    if (error) {
      // If an error occurs, log it to the console and pass it to the callback function.
      console.log(error);
      callback(error);
    } else {
      let filesProcessed = 0;
      let fileFound = false; // Flag variable to keep track of whether any files were found.
      // Loop through the files in the "images/" directory.
      for (const file of files) {
        if (file.startsWith(user_guid)) {
          // If the filename starts with the user guid, delete the file using fs.unlink.
          const filePath = path.join("images/", file);
          fs.unlink(filePath, (error) => {
            if (error) {
              // If an error occurs while deleting the file, log it to the console and pass it to the callback function.
              console.log(error);
              callback(error);
            } else {
              // If the file is successfully deleted, set the flag to true and increment the counter.
              fileFound = true;
              filesProcessed++;
              if (filesProcessed === files.length) {
                // If all files have been processed, pass a null error object to the callback function.
                callback(null);
              }
            }
          });
        } else {
          // If the filename does not start with the user guid, increment the counter.
          filesProcessed++;
          console.log(
            `filesprocessed ${filesProcessed}, files length ${files.length}`
          );
          if (filesProcessed === files.length) {
            // If all files have been processed and no matching file was found, pass a null error object to the callback function.
            if (!fileFound) {
              callback(null);
            }
          }
        }
      }
      if (files.length === 0) callback(null);
    }
  });
};

exports.module = checkForExistingImage;

