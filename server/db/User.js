const { DataTypes, UUIDV4 } = require('sequelize');
const bcrypt = require('bcrypt');

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
        afterCreate: (user) => {
          delete user.dataValues.password;
          delete user.dataValues.createdAt;
          delete user.dataValues.updatedAt;
        },
        afterUpdate: (user) => {
          delete user.dataValues.password;
          delete user.dataValues.createdAt;
          delete user.dataValues.updatedAt;
        },
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
