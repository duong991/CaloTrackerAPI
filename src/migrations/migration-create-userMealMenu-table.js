'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Meal_Menus', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            menuId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "UserMenu",
                //     key: "id",
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE",
            },
            mealId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "Meal",
                //     key: "id",
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE",
            },
            userMealId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "UserMeal",
                //     key: "id",
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User_Meal_Menus');
    },
};
