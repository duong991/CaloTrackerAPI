'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Infos', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // unique: true,
                // references: {
                //     model: "User",
                //     key: "id",
                // },
                // onUpdate: "CASCADE",
                // onDelete: "CASCADE",
            },
            weight: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            height: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            activityLevel: {
                type: Sequelize.ENUM(
                    'sedentary',
                    'moderatelyActive',
                    'active',
                    'veryActive',
                ),
                allowNull: false,
            },
            BMR: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
                ),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User_Infos');
    },
};
