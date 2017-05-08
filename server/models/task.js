'use strict'

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    volunteerCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    volunteersNeeded: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsToMany(models.User, {through: models.VolunteerTask})
      }
    }
  })

  Task.beforeValidate((task, options) => {
    task.volunteerCount = 0
  })

  return Task
}
