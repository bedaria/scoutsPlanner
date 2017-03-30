'use strict'

module.exports = function(DB, DataTypes) {
  var Group = DB.define('Group', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Group.belongsTo(models.User, {as: 'owner'})
        Group.belongsToMany(models.User, {as: 'member', through: 'GroupMembers'})
      }
    }
  })

  return Group
}
