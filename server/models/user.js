'use strict'

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicturePath: DataTypes.STRING
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
