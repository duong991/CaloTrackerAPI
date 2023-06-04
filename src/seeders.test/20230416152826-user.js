'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    username: 'user1',
                    password: 'password1',
                    role: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'user2',
                    password: 'password2',
                    role: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
