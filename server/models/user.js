'use strict'

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phoneAreaCode: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
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

  User.beforeValidate((user, options) => {
    if(user.phoneAreaCode.length !== 3 || user.phoneNumber.length !== 7)
      return sequelize.Promise.reject("Invalid phone number!")
  })

  return User
}
