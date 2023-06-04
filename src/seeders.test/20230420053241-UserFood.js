'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Foods', [
            {
                userId: 1,
                name: 'Cơm trắng',
                calories: 200,
                protein: 5,
                carbohydrates: 40,
                fat: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                name: 'Thịt kho',
                calories: 300,
                protein: 20,
                carbohydrates: 10,
                fat: 25,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                name: 'Bún chả',
                calories: 400,
                protein: 15,
                carbohydrates: 50,
                fat: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Foods', null, {});
    },
};
