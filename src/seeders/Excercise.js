'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Exercises', [
            {
                name: 'Chạy bộ',
                caloriesBurned: 100,
                duration: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Đạp xe',
                caloriesBurned: 120,
                duration: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Bơi lội',
                caloriesBurned: 150,
                duration: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Exercises', null, {});
    },
};
