'use strict'

module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Group.belongsTo(models.User, {as: 'admin'})
        Group.belongsToMany(models.User, {through: 'GroupMembers'})
      }
    }
  })

  // Group.afterCreate(function(group, options, fn) {
  //   group.getAdmin()
  //     .then(admin => {
  //       if(!admin)
  //         console.log("ERROR (in ../models/server.js 22 ): Group ", group.name, " must have an admin")
  //     })
  // })
  return Group
}
