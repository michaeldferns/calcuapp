const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  const History = sequelize.define('History', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      alllowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      alllowNull: false,
    },
  });

  return History;
};
