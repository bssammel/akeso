const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    console.log("psql-setup-script.js is running!")
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
