'use strict'

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Group, {through: 'GroupMembers'})
        User.belongsToMany(models.Event, {through: models.EventVolunteer})
        User.belongsToMany(models.Task, {through: 'VolunteerTasks'})
      }
    }
  })

  return User
}
