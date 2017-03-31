'use strict'

module.exports = function(DB, DataTypes) {
  var VolunteerTasks = DB.define('VolunteerTasks', {
    event_id: DataTypes.NUMBER
  })
  return VolunteerTasks
}
