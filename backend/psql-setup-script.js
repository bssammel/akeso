const { sequelize } = require('./db/models');

// console.log("psql-setup-script.js is running! (1)")

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  // console.log("psql-setup-script.js is running! (2)")
  // console.log(process.env.SCHEMA)
  // need to figure out if this works, why this data.includes line exists and why it is a not. i know it works on my previous project but something is going wonky here
  // await sequelize.createSchema(process.env.SCHEMA);
  if (!data.includes(process.env.SCHEMA)) {
    // console.log("psql-setup-script.js is running! 3!")
    await sequelize.createSchema(process.env.SCHEMA);
  }
});
