/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      User_role:
 *        type: object
 *        properties:
 *          roleId:
 *            type: integer
 *          userId:
 *            type: integer
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           roleId: 12
 *           userId: 1
 */
module.exports = (sequelize, DataTypes) => {
  const User_role = sequelize.define(
    'user_roles',
    {
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  User_role.associate = (models) => {
    User_role.belongsTo(models.user, {
      foreignKey: {
        field: 'userId',
      },
    });
    User_role.belongsTo(models.roles, {
      foreignKey: {
        field: 'roleId',
      },
    });
  };
  return User_role;
};
/* eslint-enable */
