'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('User_Weight_Histories', 'userId', {
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
        await queryInterface.removeColumn('User_Weight_Histories', 'userId');
    },
};
