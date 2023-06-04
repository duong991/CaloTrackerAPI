'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Water_Logs', [
            {
                userId: 1,
                date: '2023-04-21',
                amount: 500,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                date: '2023-04-21',
                amount: 700,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                date: '2023-04-21',
                amount: 1000,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Water_Logs', null, {});
    },
};
