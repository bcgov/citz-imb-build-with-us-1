// Dotenv from root dir
require('dotenv').config({ path: '../../' });
const app = require("./express");

const port = process.env.MATCHMAKING_BACKEND_PORT || 5005;

app.listen(port, (err) => {
  if (err) console.error(err);
  console.info(`Express Server started on port ${port}.`);
});
