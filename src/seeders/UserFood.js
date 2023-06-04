'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Foods', [
            {
                userId: 1,
                name: 'Thịt bò xào rau cải',
                calories: 250,
                protein: 20,
                carbohydrates: 10,
                fat: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                name: 'Cơm tấm sườn bì',
                calories: 500,
                protein: 30,
                carbohydrates: 70,
                fat: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 1,
                name: 'Bún chả giò',
                calories: 400,
                protein: 25,
                carbohydrates: 60,
                fat: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                name: 'Phở gà',
                calories: 350,
                protein: 15,
                carbohydrates: 50,
                fat: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Foods', null, {});
    },
};
