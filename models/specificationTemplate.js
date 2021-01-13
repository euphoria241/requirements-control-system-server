module.exports = (sequelize, DataTypes) => {
  const SpecificationTemplate = sequelize.define('SpecificationTemplate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  return SpecificationTemplate;
};
