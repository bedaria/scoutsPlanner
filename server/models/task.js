'use strict'

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsToMany(models.User, {through: models.VolunteerTask})
      }
    }
  })

  return Task
}
