'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Foods', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            calories: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            protein: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            carbohydrates: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            fat: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('Foods');
    },
};
