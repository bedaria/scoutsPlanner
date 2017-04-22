'use strict'

module.exports = function(sequelize, DataTypes) {
  var EventVolunteer = sequelize.define('EventVolunteer', {
    startDateTime: DataTypes.DATE,
    endDateTime: DataTypes.DATE,
    isAttending: {
      type: DataTypes.ENUM,
      values: ['Yes', 'No', 'Maybe']
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return EventVolunteer
}
