'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roleAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  roleAccess.init({
    role_id: DataTypes.INTEGER,
    module_id: DataTypes.INTEGER,
    is_read: DataTypes.BOOLEAN,
    is_write: DataTypes.BOOLEAN,
    is_update: DataTypes.BOOLEAN,
    is_delete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'roleAccess',
  });
  return roleAccess;
};