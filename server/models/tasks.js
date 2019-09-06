'use strict';
export default (sequelize, DataTypes) => {
  const Tasks = sequelize.define('Tasks', {
    title: { 
      type : DataTypes.STRING
    },
    author: {
      type : DataTypes.STRING
    },
    description: {
      type : DataTypes.STRING
    },
    finalDate: {
      type : DataTypes.DATE
    },
    userId: {
      type : DataTypes.INTEGER
    }
  }, {});
  Tasks.associate = function(models) {
    Tasks.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Tasks;
};