'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Meal_Menus', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            menuId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "Menu",
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
        await queryInterface.dropTable('Meal_Menus');
    },
};
