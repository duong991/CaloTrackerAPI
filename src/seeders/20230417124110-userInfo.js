'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('User_Infos', [
            {
                userId: 31,
                weight: 70,
                height: 170,
                activityLevel: 'moderatelyActive',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 32,
                weight: 65,
                height: 165,
                activityLevel: 'active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('User_Infos', null, {});
    },
};
