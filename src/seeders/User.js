'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                username: 'admin',
                password: 'admin',
                role: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: 'user',
                password: 'user',
                role: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
