'use strict'

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
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
