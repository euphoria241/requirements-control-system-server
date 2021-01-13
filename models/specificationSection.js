module.exports = (sequelize, DataTypes) => {
  const SpecificationSection = sequelize.define('SpecificationSection', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
  SpecificationSection.associate = models => {
    SpecificationSection.belongsTo(models.Specification, {
      foreignKey: { name: 'specificationID', allowNull: false },
    });
  };

  return SpecificationSection;
};
