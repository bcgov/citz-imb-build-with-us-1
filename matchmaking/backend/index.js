require("dotenv").config();
const { setTimeout } = require("timers");
const { colors } = require("./utils");
const app = require("./express.js");
const { checkForNewMigrations } = require("./database/migrations.js");

const port = process.env.PORT ?? 5005;

// Check for/run new database migrations.
checkForNewMigrations()
  .then(() => {
    // Wait for 2 seconds before starting the server.
    setTimeout(() => {
      // Start server.
      app.listen(port, (error) => {
        if (error) console.error(error);
        console.info(
          `${colors.LBlue}Express Server started on port ${colors.Reset}${port}${colors.LBlue}.${colors.Reset}`
        );
      });
    }, 2000);
  })
  .catch((error) => {
    console.error(
      `${colors.Pink}Error while running migrations${colors.Reset}`,
      error
    );
  });
