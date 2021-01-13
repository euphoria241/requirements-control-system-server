module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    author: {
      type: DataTypes.INTEGER,
    },
    project: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Requirement.associate = models => {
    Requirement.belongsTo(models.Type, {
      foreignKey: 'type',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      // allowNull: true,
    });
    Requirement.belongsTo(models.Priority, {
      foreignKey: 'priority',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      // allowNull: true,
    });
    Requirement.belongsTo(models.Status, {
      foreignKey: 'status',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      // allowNull: true,
    });
  };
  return Requirement;
};
