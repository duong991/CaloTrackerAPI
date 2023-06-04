'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Meal_Foods', [
            {
                mealId: 1,
                foodId: 4,
                servingSize: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                mealId: 1,
                foodId: 5,
                servingSize: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                mealId: 2,
                foodId: 6,
                servingSize: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                mealId: 3,
                foodId: 4,
                servingSize: 150,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Meal_Foods', null, {});
    },
};
