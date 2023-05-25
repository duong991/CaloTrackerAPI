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
            },
            gender: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
                    'Rất ít hoạt động',
                    'Ít hoạt động',
                    'Hoạt động vừa phải',
                    'Hoạt động nhiều',
                    'Hoạt động tích cực',
                ),
                allowNull: false,
            },
            BMR: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            target: {
                type: Sequelize.ENUM(
                    'Giảm cân',
                    'Tăng cân',
                    'Giữ nguyên cân nặng',
                ),
            },
            lastTimeToUpdate: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            protein: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            fat: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            carb: {
                type: Sequelize.FLOAT,
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
