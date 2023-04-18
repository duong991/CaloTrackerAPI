'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Meal_Foods', 'mealId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Meals',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        await queryInterface.changeColumn('Meal_Foods', 'foodId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Foods',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Meal_Foods', 'mealId');
        await queryInterface.removeColumn('Meal_Foods', 'foodId');
    },
};
