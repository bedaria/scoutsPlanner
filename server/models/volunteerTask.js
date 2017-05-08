'use strict'

module.exports = function(sequelize, DataTypes) {
  var VolunteerTask = sequelize.define('VolunteerTask', {
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  })

  return VolunteerTask
}
