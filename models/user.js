/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *          username:
 *            type: string
 *            description: username of the user
 *          email:
 *            type: string
 *            description: email of the user
 *          password:
 *            type: string
 *            description: hash password of the user
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           username: Alexander
 *           email: fake@email.com
 *           password: fakepassworde
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );

  return User;
};
/* eslint-enable */
