'use strict'

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {as: 'mainAdmin'})
        // Event.belongsToMany(models.User, {through: 'EventAdmins'})
        Event.belongsToMany(models.User, {as: 'volunteer', through: models.EventVolunteer})
        Event.hasMany(models.Task)
      }
    }
  })

  return Event
}
