'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user_meals', [
            {
                userId: 1,
                name: 'Bữa ăn sáng',
                description: 'Bữa ăn sáng cho người ăn kiêng',
                image: null,
                calories: 350,
                protein: 20,
                carbohydrates: 50,
                fat: 8,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                userId: 2,
                name: 'Bữa ăn trưa',
                description: 'Bữa ăn trưa cho người tập thể hình',
                image: null,
                calories: 500,
                protein: 40,
                carbohydrates: 60,
                fat: 10,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                userId: 3,
                name: 'Bữa ăn tối',
                description: 'Bữa ăn tối cho người giảm cân',
                image: null,
                calories: 300,
                protein: 15,
                carbohydrates: 40,
                fat: 7,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_meals', null, {});
    },
};
