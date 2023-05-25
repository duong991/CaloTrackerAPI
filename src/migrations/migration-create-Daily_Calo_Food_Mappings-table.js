'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Daily_Calo_Food_Mappings', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            dailyCaloId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            foodId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            mealId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            menuId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            userFoodId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            userMealId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            userMenuId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            servingSize: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Daily_Calo_Food_Mappings');
    },
};
