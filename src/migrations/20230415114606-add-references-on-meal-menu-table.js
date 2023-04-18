'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Meal_Menus', 'menuId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Menus',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        await queryInterface.changeColumn('Meal_Menus', 'mealId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Meals',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Meal_Menus', 'menuId');
        await queryInterface.removeColumn('Meal_Menus', 'mealId');
    },
};
