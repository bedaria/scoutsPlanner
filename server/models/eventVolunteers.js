'use strict'

module.exports = function(DB, DataTypes) {
  var EventVolunteers = DB.define('EventVolunteers', {
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    attending: DataTypes.BOOLEAN,
    seen: DataTypes.BOOLEAN
  })
  return EventVolunteers
}
