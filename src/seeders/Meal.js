'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const meals = [
            {
                name: 'Cơm gà',
                description: 'Món ăn truyền thống Việt Nam',
                image: null,
                calories: 500,
                protein: 30,
                carbohydrates: 60,
                fat: 15,
                mealType: 'breakfast',
            },
            {
                name: 'Bún bò',
                description: 'Món ăn đặc sản Huế',
                image: null,
                calories: 600,
                protein: 35,
                carbohydrates: 70,
                fat: 20,
                mealType: 'lunch',
            },
            {
                name: 'Phở gà',
                description: 'Món ăn nổi tiếng của Việt Nam',
                image: null,
                calories: 550,
                protein: 25,
                carbohydrates: 65,
                fat: 18,
                mealType: 'breakfast',
            },
        ];

        return queryInterface.bulkInsert('Meals', meals);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Meals', null, {});
    },
};
