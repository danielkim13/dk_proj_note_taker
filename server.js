// required npm and node module
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// port setting
const PORT = process.env.PORT || 3001;
// instantiate the server.
const app = express();

// express middleware for parsing incoming string or array data and JSON data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setting express static for public directory
app.use(express.static("public"));
// express Router
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
