module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define('Specification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
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
    },
  });
  return Specification;
};
