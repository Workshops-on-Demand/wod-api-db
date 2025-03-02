/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      Location:
 *        type: object
 *        required:
 *          - name
 *          - basestdid
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of the location
 *          basestdid:
 *            type: integer
 *            description: base of the student id
 *          proto:
 *            type: string
 *            description: protocol used to dialog with the backend mentionned in location (http or https)
 *          port:
 *            type: string
 *            description: port used to dialog with the backend mentionned in location
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           name: backend1.domain.local
 *           basestdid: 2000
 */
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'location',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      proto: DataTypes.STRING,
      port: DataTypes.STRING,
      basestdid: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );

  return Location;
};
/* eslint-enable */
