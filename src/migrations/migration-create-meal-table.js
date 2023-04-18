'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Meals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            image: {
                allowNull: true,
                type: Sequelize.BLOB,
            },
            calories: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            protein: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            carbohydrates: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            fat: {
                allowNull: false,
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('Meals');
    },
};
