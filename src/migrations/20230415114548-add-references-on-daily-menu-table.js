'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Daily_Menus', 'userId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        await queryInterface.changeColumn('Daily_Menus', 'menuId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Menus',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
        await queryInterface.changeColumn('Daily_Menus', 'userMenuId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'User_Menus',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Daily_Menus', 'userId');
        await queryInterface.removeColumn('Daily_Menus', 'menuId');
        await queryInterface.removeColumn('Daily_Menus', 'userMenuId');
    },
};
