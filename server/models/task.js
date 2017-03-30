'use strict'

module.exports = function(DB, DataTypes) {
  var Task = DB.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsToMany(models.User, { as: 'volunteer', through: 'VolunteerTasks'})
      }
    }
  })

  return Task
}
