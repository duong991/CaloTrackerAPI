'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Meal_foods', [
            {
                mealId: 1,
                foodId: 1,
                userFoodId: null,
                servingSize: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                mealId: 1,
                foodId: null,
                userFoodId: 1,
                servingSize: 300,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                mealId: 1,
                foodId: 2,
                userFoodId: null,
                servingSize: 300,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Meal_foods', null, {});
    },
};
