const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        alllowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.createdAt;
          delete record.dataValues.updatedAt;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password;
          delete record.dataValues.createdAt;
          delete record.dataValues.updatedAt;
        },
      },
    }
  );

  return User;
};
