'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('MealMenus', [
            {
                menuId: 1,
                mealId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 1,
                mealId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                menuId: 2,
                mealId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('MealMenus', null, {});
    },
};
