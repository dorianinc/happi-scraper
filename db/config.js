module.exports = {
  production: {
    storage: "db/prod.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
  },
  development: {
    storage: "db/dev.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
  },
};


// const path = require("path");
// const { app } = require("electron");

// const userDataPath = app.getPath("userData");
// const productionDbPath = path.join(userDataPath, "databases", "dev.db");

// module.exports = {
//   production: {
//     storage: productionDbPath, // Use dynamic path
//     dialect: "sqlite",
//     seederStorage: "sequelize",
//     logQueryParameters: true,
//     typeValidation: true,
//   },
//   development: {
//     storage: path.join(__dirname, "dev.db"), // Relative path for development
//     dialect: "sqlite",
//     seederStorage: "sequelize",
//     logQueryParameters: true,
//     typeValidation: true,
//   },
// };
