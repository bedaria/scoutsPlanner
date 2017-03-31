'use strict'

module.exports = function(sequelize, DataTypes) {
  var EventVolunteers = sequelize.define('EventVolunteers', {
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    attending: DataTypes.BOOLEAN,
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return EventVolunteers
}
