'use strict';

const faker = require('faker');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const users = await queryInterface.sequelize.query(
            'SELECT id FROM "Users";',
        );

        const meals = [
            {
                userId: users[0][0].id,
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
                userId: users[0][1].id,
                name: 'Bún bò',
                description: 'Món ăn đặc sản Huế',
                image: null,
                calories: 600,
                protein: 35,
                carbohydrates: 70,
                fat: 20,
                mealType: 'breakfast',
            },
            {
                userId: users[0][2].id,
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

        return queryInterface.bulkInsert('user_meals', meals);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_meals', null, {});
    },
};
