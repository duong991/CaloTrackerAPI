'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('UserExercises', [
            {
                userId: 1,
                exerciseId: 1,
                date: new Date(),
                duration: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                exerciseId: 2,
                date: new Date(),
                duration: 60,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 1,
                exerciseId: 3,
                date: new Date(),
                duration: 45,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('UserExercises', null, {});
    },
};
