const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

const User = require('./User')(sequelize);
const History = require('./History')(sequelize);

User.hasMany(History, { foreignKey: 'userId' });

module.exports = sequelize;
