'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Foods', [
            {
                name: 'Bánh mì',
                calories: 250,
                protein: 10,
                carbohydrates: 40,
                fat: 5,
                foodType: 'Bữa sáng',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Cơm',
                calories: 450,
                protein: 20,
                carbohydrates: 50,
                fat: 10,
                foodType: 'Bữa trưa',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Salad trộn',
                calories: 200,
                protein: 5,
                carbohydrates: 30,
                fat: 3,
                foodType: 'Bữa tối',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Foods', null, {});
    },
};
