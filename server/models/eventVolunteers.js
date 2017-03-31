'use strict'

module.exports = function(sequelize, DataTypes) {
  var EventVolunteers = sequelize.define('EventVolunteers', {
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    isAttending: {
      type: DataTypes.ENUM,
      values: ['Yes', 'No', 'Maybe', null],
      defaultValue: null
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })
  return EventVolunteers
}
