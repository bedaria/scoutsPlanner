'use strict'

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {as: 'mainAdmin'})
        Event.belongsToMany(models.User, {as: 'admin', through: 'EventAdmins'})
        Event.belongsToMany(models.User, {as: 'volunteer', through: 'EventVolunteers'})
        Event.hasMany(models.Task)
      }
    }
  })

  return Event
}
