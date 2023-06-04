'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Meal_Menus', [
            {
                menuId: 1,
                mealId: 1,
                userMealId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 1,
                mealId: 2,
                userMealId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 1,
                mealId: 3,
                userMealId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 2,
                mealId: 4,
                userMealId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 2,
                mealId: 5,
                userMealId: 5,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 2,
                mealId: 6,
                userMealId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 3,
                mealId: 7,
                userMealId: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 3,
                mealId: 8,
                userMealId: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 3,
                mealId: 9,
                userMealId: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Meal_Menus', null, {});
    },
};
