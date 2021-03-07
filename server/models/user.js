'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Collection, { foreignKey: 'UserId', targetKey: 'id' })
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "First Name is required"
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Last Name is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email should be right"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};