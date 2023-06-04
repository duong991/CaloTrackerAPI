'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Weight_Histories', [
            {
                userId: 1,
                date: '2023-04-19',
                role: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                date: '2023-04-20',
                role: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                date: '2023-04-21',
                role: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Weight_Histories', null, {});
    },
};
