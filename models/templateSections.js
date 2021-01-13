module.exports = (sequelize, DataTypes) => {
  const TemplateSection = sequelize.define('TemplateSection', {
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
  });

  TemplateSection.associate = models => {
    TemplateSection.belongsTo(models.SpecificationTemplate, {
      foreignKey: { name: 'templateID', allowNull: false },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return TemplateSection;
};
