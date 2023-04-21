'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Meal_Foods', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            mealId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "UserMeal",
                //     key: "id",
                // },
            },
            foodId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                // references: {
                //     model: "Food",
                //     key: "id",
                // },
            },
            userFoodId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                // references: {
                //     model: "UserFood",
                //     key: "id",
                // },
            },
            servingSize: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User_Meal_Foods');
    },
};
