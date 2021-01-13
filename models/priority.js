module.exports = (sequelize, DataTypes) => {
  const Priority = sequelize.define(
    'Priority',
    {
      priority: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Priority;
};
