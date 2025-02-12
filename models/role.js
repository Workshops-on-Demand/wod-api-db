/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      Role:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: role name
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           name: Alexander
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'roles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  return Role;
};

/* eslint-enable */
