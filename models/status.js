module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    'Status',
    {
      status: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
  return Status;
};
