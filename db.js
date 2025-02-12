import Sequelize from 'sequelize';

const sequelize = new Sequelize('grommet-innovation-dev', 'postgres', 'example', {
  host: '127.0.0.1',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

export default sequelize;
