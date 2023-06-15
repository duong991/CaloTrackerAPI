'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const userWeightHistoriesData = [];
        const userId = 33;

        for (let i = 0; i < 12; i++) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);

            const userWeightHistory = {
                userId: userId,
                date: currentDate,
                weight: 70.0 + i, // Ví dụ: Trọng lượng tăng dần từ 70.0 đến 81.0
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            userWeightHistoriesData.push(userWeightHistory);
        }

        await queryInterface.bulkInsert(
            'User_Weight_Histories',
            userWeightHistoriesData,
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Weight_Histories', null, {});
    },
};
