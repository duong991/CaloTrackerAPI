'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Infos', [
            {
                userId: 1,
                weight: 70,
                height: 170,
                activityLevel: 'moderatelyActive',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                weight: 65,
                height: 165,
                activityLevel: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 3,
                weight: 80,
                height: 180,
                activityLevel: 'veryActive',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Infos', null, {});
    },
};
