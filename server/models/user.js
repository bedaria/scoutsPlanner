'use strict'

module.exports = function(DB, DataTypes) {
  var User = DB.define('User', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Group, {through: 'GroupMembers'})
        User.belongsToMany(models.Event, {through: 'EventVolunteers'})
        User.belongsToMany(models.Task, {through: 'VolunteerTasks'})
      }
    }
  })

  return User
}
