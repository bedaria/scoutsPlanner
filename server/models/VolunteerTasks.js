'use strict'

module.exports = function(sequelize, DataTypes) {
  var VolunteerTasks = sequelize.define('VolunteerTasks', {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return VolunteerTasks
}
