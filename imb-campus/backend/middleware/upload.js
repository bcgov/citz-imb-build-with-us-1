const multer = require("multer");
const path = require("path");
const { checkForExistingImage } = require("../utils");

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

module.exports = upload;
