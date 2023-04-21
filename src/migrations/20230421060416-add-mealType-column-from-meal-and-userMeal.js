module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Meals', 'mealType', {
            type: Sequelize.ENUM('breakfast', 'lunch', 'dinner', 'snacks'),
            allowNull: false,
        });
        await queryInterface.addColumn('User_Meals', 'mealType', {
            type: Sequelize.ENUM('breakfast', 'lunch', 'dinner', 'snacks'),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Meals', 'mealType');
        await queryInterface.removeColumn('User_Meals', 'mealType');
    },
};
