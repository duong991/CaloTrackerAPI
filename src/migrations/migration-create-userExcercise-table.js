'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Exercises', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "User",
                //     key: "id",
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE",
            },
            exerciseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "Exercise",
                //     key: "id",
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE",
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            duration: {
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
        await queryInterface.dropTable('User_Exercises');
    },
};
