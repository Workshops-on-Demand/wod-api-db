/* eslint-disable */
'use strict';
/**
 * @swagger
 *  components:
 *    schemas:
 *      Customer:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - company
 *          - title
 *          - notebook
 *          - sessionType
 *          - proxy
 *          - location
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *            description: name of the customer
 *          email:
 *            type: string
 *            description: email of the customer
 *          company:
 *            type: string
 *            description: company name of the customer
 *          sessionName:
 *            type: string
 *            description: name of workshop registered by the customer
 *          sessionType:
 *            type: string
 *            description: Type of session either workshop registered by the customer
 *          notebook:
 *            type: string
 *            description: name of notebook in jupyterhub registered by the customer
 *          location:
 *            type: string
 *            description: location of workshop in jupyterhub registered by the customer
 *          proxy:
 *            type: string
 *            description: request originitation platform like hackshack site or from the external partner
 *          active:
 *            type: boolean
 *            description: customer will be active between the workshop start and end date
 *          lastEmailSent:
 *            type: string
 *            description: lastEmailSent can be welcome | credentials |  expiring | expired
 *          hours:
 *            type: boolean
 *          startDate:
 *            type: string
 *            format: date-time
 *            description: workshop start date
 *          endDate:
 *            type: string
 *            format: date-time
 *            description: workshop end date
 *          specialBadgeId:
 *            type: integer
 *            description: special badge id
 *          completionPercentage:
 *            type: integer
 *            description: workshop completion percentage
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 *           company: someCompany
 *           sessionName: Grommet
 *           sessionType: workshop
 *           proxy: wod
 *           active: false
 *           lastEmailSent: welcome
 */
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'customer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      company: DataTypes.STRING,
      sessionName: DataTypes.STRING,
      sessionType: DataTypes.STRING,
      location: DataTypes.STRING,
      proxy: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lastEmailSent: DataTypes.STRING,
      notebook: DataTypes.STRING,
      hours: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      specialBadgeId: DataTypes.INTEGER,
      completionPercentage: DataTypes.INTEGER,
      endDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );
  Customer.associate = (models) => {
    Customer.belongsTo(models.student, {
      foreignKey: {
        field: 'studentId',
      },
    });
    Customer.belongsTo(models.special_badge, {
      foreignKey: {
        field: 'specialBadgeId',
      },
    });
  };
  return Customer;
};
/* eslint-enable */
