'use strict'

module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Group.belongsTo(models.User, {as: 'admin'})
        Group.belongsToMany(models.User, {as: 'member', through: 'GroupMembers'})
      }
    }
  })

  return Group
}
