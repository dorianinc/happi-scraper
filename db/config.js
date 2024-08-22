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
