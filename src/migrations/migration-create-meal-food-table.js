'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Meal_Foods', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            mealId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "Meal",
                //     key: "id",
                // },
            },
            foodId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "Food",
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
        // await queryInterface.addIndex("MealFoods", ["mealId"]);
        // await queryInterface.addIndex("MealFoods", ["foodId"]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Meal_Foods');
    },
};
