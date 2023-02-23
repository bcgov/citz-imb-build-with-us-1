const multer = require("multer");
const fs = require("fs");
const path = require("path");

/**
 * Define the storage configuration for multer using diskStorage method.
 * @author Brady Mitchell <braden.mitchell@gov.bc.ca | braden.jr.mitch@gmail.com>
 * @property {function} destination - Determines the destination directory for the uploaded file.
 * @property {function} filename - Determines the filename for the uploaded file.
 * @property {function} fileFilter - Determines if a file should be accepted based on its extension.
 * @property {Object} limits - Specifies the file size limit and an error handling function.
 */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/");
  },
  filename: (req, file, callback) => {
    const user = req.user;
    const guid = user?.idir_user_guid;
    const fileExtension = path.extname(file.originalname);
    // Check if we were able to get a user guid from the request object.
    if (guid) {
      // Delete old files.
      checkForExistingImage(guid, (error) => {
        // If an error occurs while deleting files, pass the error to the callback.
        if (error) {
          callback(error);
        } else {
          // If there are no errors, create the new filename and pass it to the callback.
          callback(null, `${guid}${fileExtension}`);
        }
      });
    } else {
      // If we couldn't get a user guid from the request object, pass an error to the callback.
      callback(new Error("Couldn't get user guid."));
    }
  },
  fileFilter: (req, file, callback) => {
    // Only accept jpg or png files.
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(
        new Error("Allowed file extensions include jpg, jpeg, and png."),
        false
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024, // Limit file size to 1 MB.
    onFileSizeLimit: (file, callback) => {
      callback(new Error("File exceeds max size of 1 MB."));
    },
  },
});

const upload = multer({ storage: storage });

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

module.exports = upload;

