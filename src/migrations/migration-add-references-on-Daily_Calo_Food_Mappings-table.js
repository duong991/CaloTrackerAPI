'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(
            'Daily_Calo_Food_Mappings',
            'dailyCaloId',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Daily_Calos',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        );
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'Daily_Calo_Food_Mappings',
            'dailyCaloId',
        );
    },
};
