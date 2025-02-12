'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "workshops", deps: []
 * createTable "students", deps: []
 * createTable "customers", deps: []
 * createTable "user", deps: []
 * createTable "role", deps: []
 * createTable "replay", deps: []
 * createTable "special_badges", deps: []
 * createTable "locations", deps: []
 **/

var info = {
  revision: 2,
  name: 'test',
  created: '2021-01-20T02:31:23.794Z',
  comment: '',
};

var migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'workshops',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
        },
        notebook: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
        },
        priority: {
          type: Sequelize.INTEGER,
        },
        range: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
        },
        reset: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        ldap: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        sessionId: {
          type: Sequelize.INTEGER,
        },
        sessionType: {
          type: Sequelize.STRING,
        },
        location: {
          type: Sequelize.STRING,
        },
        avatar: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.STRING,
        },
        preRequisite: {
          type: Sequelize.TEXT,
        },
        replayLink: {
          type: Sequelize.TEXT,
        },
        compile:{
          type: Sequelize.STRING,
        },
        varpass:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        replayId:{
          type: Sequelize.INTEGER,
        },
        workshopImg:{
          type: Sequelize.STRING,
        },
        badgeImg:{
          type: Sequelize.STRING,
        },
        monoappliance:{
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        multiappliance:{
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        beta:{
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        category:{
          type: Sequelize.ARRAY(Sequelize.TEXT),
        },
        alternateLocation:{
          type: Sequelize.ARRAY(Sequelize.TEXT),
        },
        duration:{
          type: Sequelize.INTEGER,
          defaultValue: 4
        },
        presenter:{
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'students',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        url: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        assigned: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        location: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'locations',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: Sequelize.STRING,
        basestdid: Sequelize.INTEGER,
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'customers',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        company: Sequelize.STRING,
        //workshopList: Sequelize.ARRAY(Sequelize.STRING),
        sessionName: Sequelize.STRING,
        sessionType: Sequelize.STRING,
        location: Sequelize.STRING,
        notebook: {
          type: Sequelize.STRING,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        lastEmailSent: Sequelize.STRING,
        hours: Sequelize.INTEGER,
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        studentId: {
          type: Sequelize.INTEGER,
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          references: {
            model: 'students',
            key: 'id',
          },
        },
        proxy:{
          type: Sequelize.STRING,
        },
        specialBadgeId:{
          type: Sequelize.INTEGER,
        },
        completionPercentage:{
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        roleId: {
          type: Sequelize.INTEGER,
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          references: {
            model: 'users',
            key: 'id',
          },
          // allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {},
    ],
  },
  {
    fn: 'createTable',
    params: [
      'roles',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        userId: {
          type: Sequelize.INTEGER,
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION',
          references: {
            model: 'roles',
            key: 'id',
          },
          // allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      },
      {},
    ],
  },
  // {
  //   fn: 'createTable',
  //   params: [
  //     'replays',
  //     {
  //       id: {
  //         type: Sequelize.INTEGER,
  //         primaryKey: true,
  //         autoIncrement: true,
  //       },
  //       avatar: Sequelize.STRING,
  //       title: Sequelize.STRING,
  //       desc: Sequelize.TEXT,
  //       presenter: Sequelize.STRING,
  //       role: Sequelize.STRING,
  //       videoLink: Sequelize.STRING,
  //       workshopId:Sequelize.INTEGER,
  //       active:{
  //         type: Sequelize.BOOLEAN,
  //         allowNull: false,
  //         defaultValue: false,
  //       },
  //       createdAt: Sequelize.DATE,
  //       updatedAt: Sequelize.TEXT,
  //     },
  //     {},
  //   ],
  // },
  {
    fn: 'createTable',
    params: [
      'special_badges',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        badgeImg: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.TEXT,
      },
      {},
    ],
  },
];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log('[#' + index + '] execute: ' + command.fn);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info,
};
