module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define(
    'Type',
    {
      type: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Type;
};
