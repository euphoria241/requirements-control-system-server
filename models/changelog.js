module.exports = (sequelize, DataTypes) => {
  const ChangeLog = sequelize.define('ChangeLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  ChangeLog.associate = models => {
    ChangeLog.belongsTo(models.Requirement, {
      foreignKey: 'requirement_id',
    });
  };
  return ChangeLog;
};
