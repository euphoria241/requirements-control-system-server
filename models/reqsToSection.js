module.exports = (sequelize, DataTypes) => {
  const ReqsToSection = sequelize.define('ReqsToSection', {});

  ReqsToSection.associate = models => {
    ReqsToSection.belongsTo(models.SpecificationSection, {
      foreignKey: { name: 'sectionID', allowNull: false },
    });
    ReqsToSection.belongsTo(models.Requirement, {
      foreignKey: { name: 'requirementID', allowNull: false },
    });
  };
  return ReqsToSection;
};
