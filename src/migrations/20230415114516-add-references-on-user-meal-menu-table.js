'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('User_Meal_Menus', 'menuId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'User_Menus',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        await queryInterface.changeColumn('User_Meal_Menus', 'mealId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Meals',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        await queryInterface.changeColumn('User_Meal_Menus', 'userMealId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'User_Meals',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('User_Meal_Menus', 'menuId');
        await queryInterface.removeColumn('User_Meal_Menus', 'mealId');
        await queryInterface.removeColumn('User_Meal_Menus', 'userMealId');
    },
};
