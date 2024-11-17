module.exports = {
  production: {
    storage: "backend-main/db/prod.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
  },
  development: {
    storage: "backend-main/db/dev.db",
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true,
  },
};


// const path = require("path");
// const { app } = require("electron");

// const userDataPath = app.getPath("userData");
// console.log("🖥️  userDataPath: ", userDataPath);
// const productionDbPath = path.join(userDataPath, "databases", "dev.db");
// console.log("🖥️  productionDbPath: ", productionDbPath);
// console.log("potato ===>", path.join(__dirname, "dev.db"));

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
