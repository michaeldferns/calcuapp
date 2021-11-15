const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

fs.readdirSync(__dirname)
  .filter((file) => {
    // Filter Out Non-Javascript Files And Current File
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    // Setup Models
    require(path.join(__dirname, file))(sequelize);
  });

module.exports = sequelize;
