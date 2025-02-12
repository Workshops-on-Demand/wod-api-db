module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'moderator',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      }
    ),

  down: (queryInterface) => queryInterface.bulkDelete('roles', null, {}),
};
