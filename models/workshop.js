'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      Workshop:
 *        type: object
 *        required:
 *          - name
 *          - notebook
 *          - capacity
 *          - range
 *          - location
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          notebook:
 *            type: string
 *          description:
 *            type: string
 *          capacity:
 *            type: integer
 *          priority:
 *            type: integer
 *          range:
 *            type: array
 *          reset:
 *            type: boolean
 *          varpass:
 *            type: boolean
 *          ldap:
 *            type: boolean
 *          monoappliance:
 *            type: boolean
 *          multiappliance:
 *            type: boolean
 *          beta:
 *            type: boolean
 *          sessionId:
 *            type: integer
 *          sessionType:
 *            type: string
 *          location:
 *            type: string
 *          avatar:
 *            type: string
 *          role:
 *            type: string
 *          preRequisite:
 *            type: string
 *          replayLink:
 *            type: string
 *          active:
 *            type: boolean
 *          badgeImg:
 *            type: string
 *          replayId:
 *             type: integer
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *          compile:
 *            type: string
 *          category:
 *            type: array
 *          alternateLocation:
 *            type: array
 *          duration:
 *            type: integer
 *        example:
 *           name: Grommet
 *           capacity: 20
 *           notebook: WKSHP-Grommet
 *           range: [546, 549]
 *           location: notebooks3.in.world.com
 */
module.exports = (sequelize, DataTypes) => {
  const Workshop = sequelize.define(
    'workshop',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      notebook: DataTypes.STRING,
      description: DataTypes.TEXT,
      capacity: DataTypes.INTEGER,
      priority: DataTypes.INTEGER,
      range: DataTypes.ARRAY(DataTypes.INTEGER),
      reset: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      varpass: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ldap: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      monoappliance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      multiappliance: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      beta: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sessionId: DataTypes.INTEGER,
      sessionType: DataTypes.STRING,
      location: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role: DataTypes.STRING,
      preRequisite: DataTypes.TEXT,
      compile: DataTypes.STRING(1234),
      replayLink: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      workshopImg: DataTypes.STRING,
      badgeImg: DataTypes.STRING,
      replayId: DataTypes.INTEGER,
      category: DataTypes.ARRAY(DataTypes.STRING),
      alternateLocation: DataTypes.ARRAY(DataTypes.STRING),
      duration: DataTypes.INTEGER,
      presenter: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Workshop.associate = function (models) {
    // // associations can be defined here
    // Workshop.hasOne(models.replays,
      // {
        // foreignKey: {
          // field: 'replayId',
        // },
      // });
  };
  return Workshop;
};
