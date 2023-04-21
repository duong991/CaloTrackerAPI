module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Foods', 'foodType');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Foods', 'foodType', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
