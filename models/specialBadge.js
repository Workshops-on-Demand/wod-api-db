/* eslint-disable */
'use strict';
// /**
//  * @swagger
//  *  components:
//  *    schemas:
//  *      SpecialBadge:
//  *        type: object
//  *        required:
//  *          - badgeImg
//  *        properties:
//  *          id:
//  *            type: integer
//  *          name:
//  *            type: string
//  *          title: 
//  *            type: string
//  *          description: 
//  *            type: string
//  *          badgeImg: 
//  *            type: string
//  *          createdAt:
//  *            type: string
//  *            format: date-time
//  *          updatedAt:
//  *            type: string
//  *            format: date-time
//  */
module.exports = (sequelize, DataTypes) => {
  const SpecialBadge = sequelize.define(
    'special_badge',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      badgeImg: DataTypes.STRING
    },
    {}
  );
  return SpecialBadge;
};

/* eslint-enable */
