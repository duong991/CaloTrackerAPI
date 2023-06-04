'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Foods', [
            {
                name: 'Cơm trắng',
                calories: 130,
                protein: 2.7,
                carbohydrates: 28.7,
                fat: 0.3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Thịt bò',
                calories: 250,
                protein: 26,
                carbohydrates: 0,
                fat: 17,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Rau cải xanh',
                calories: 36,
                protein: 3,
                carbohydrates: 6,
                fat: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Foods', null, {});
    },
};
