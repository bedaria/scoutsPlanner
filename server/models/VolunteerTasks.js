'use strict'

module.exports = function(sequelize, DataTypes) {
  var VolunteerTask = sequelize.define('VolunteerTask', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return VolunteerTask
}
