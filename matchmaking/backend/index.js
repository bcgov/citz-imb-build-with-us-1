require('dotenv').config();
const app = require("./express");

const port = process.env.PORT ?? 5005;

app.listen(port, (err) => {
  if (err) console.error(err);
  console.info(`Express Server started on port ${port}.`);
});
