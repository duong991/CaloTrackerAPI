'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Menus', [
            {
                userId: 1,
                name: 'Bữa sáng thứ hai',
                description: 'Bữa sáng đầy đủ dinh dưỡng',
                mealType: 'breakfast',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                name: 'Bữa trưa thứ hai',
                description: 'Món ăn hấp dẫn',
                mealType: 'lunch',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                name: 'Bữa tối thứ hai',
                description: 'Thực đơn giảm cân',
                mealType: 'dinner',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Menus', null, {});
    },
};
