'use strict'

module.exports = function(sequelize, DataTypes) {
  var VolunteerTasks = sequelize.define('VolunteerTasks', {
    event_id: DataTypes.NUMBER
  })
  return VolunteerTasks
}
