'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const userMenus = [
            {
                userId: 1,
                name: 'Menu 1',
                description: 'Description for menu 1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 1,
                name: 'Menu 2',
                description: 'Description for menu 2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                name: 'Menu 3',
                description: 'Description for menu 3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('User_Menus', userMenus, {});
    },

    down: async (queryInterface, Sequelize) => {
        // Xóa các bản ghi trong bảng UserMenus
        await queryInterface.bulkDelete('User_Menus', null, {});
    },
};
