'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Daily_Menus', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "User",
                //     key: "id",
                // },
            },
            menuId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                // references: {
                //     model: "Menu",
                //     key: "id",
                // },
            },
            userMenuId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                // references: {
                //     model: "UserMenu",
                //     key: "id",
                // },
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            note: {
                type: Sequelize.TEXT,
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
        // await queryInterface.addIndex("DailyMenus", ["userId", "date"]);
        // await queryInterface.addIndex("DailyMenus", ["menuId"]);
        // await queryInterface.addIndex("DailyMenus", ["userMenuId"]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Daily_Menus');
    },
};
