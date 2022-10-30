require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;

// db
const { sequelize } = require("./db/models/index");
sequelize
  .sync()
  .then(function () {
    console.log("Database connected!");

    // start the Express server
    app.listen(PORT, () => {
      console.log(`server listen at http://localhost:${PORT}/`);
    });
  })
  .catch(function (err) {
    console.error(err, "Something went wrong, database is not connected!");
  });
