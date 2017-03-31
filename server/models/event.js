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
        Event.belongsTo(models.User, {as: 'admin'})
        Event.belongsToMany(models.User, {as: 'volunteer', through: 'EventVolunteers'})
        Event.hasMany(models.Task)
      }
    }
  })

  return Event
}
