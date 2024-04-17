const { sequelize } = require('./db/models');

console.log("psql-setup-script.js is running! (1)")

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    console.log("psql-setup-script.js is running! 2!")
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
