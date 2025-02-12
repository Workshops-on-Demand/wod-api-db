"use strict";
/**
 * @swagger
 *  components:
 *    schemas:
 *      Student:
 *        type: object
 *        required:
 *          - url
 *          - username
 *          - password
 *        properties:
 *          url:
 *            type: string
 *            description: URL for the JupyterHub student, needs to be unique.
 *          username:
 *            type: string
 *            description: username for the JupyterHub student, needs to be unique.
 *          password:
 *            type: string
 *            format: password
 *            description: password for the JupyterHub student.
 *          assigned:
 *            type: boolean
 *            description: By default false and will be true if assigned to a customer.
 *          active:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           url: someurl
 *           username: someusername
 *           password: somepassword
 */
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      assigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
/*
 * depending on the location, the student id range is different
 */
      location: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );

  return Student;
};
