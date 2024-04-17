const { sequelize } = require('./db/models');

console.log("psql-setup-script.js is running! (1)")

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  console.log("psql-setup-script.js is running! (2)")
  console.log(process.env.SCHEMA)
  if (!data.includes(process.env.SCHEMA)) {
    console.log("psql-setup-script.js is running! 3!")
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
