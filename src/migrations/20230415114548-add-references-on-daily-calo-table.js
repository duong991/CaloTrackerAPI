'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Daily_Calos', 'userId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Daily_Calos', 'userId');
    },
};
