module.exports = (sequelize, DataTypes) => {
  const ReqsToReq = sequelize.define('ReqsToReq', {});

  ReqsToReq.associate = models => {
    ReqsToReq.belongsTo(models.Requirement, {
      foreignKey: { name: 'req1ID', allowNull: false },
    });
    ReqsToReq.belongsTo(models.Requirement, {
      foreignKey: { name: 'req2ID', allowNull: false },
    });
  };
  return ReqsToReq;
};
