module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Menus', 'mealType');
        await queryInterface.removeColumn('User_Menus', 'mealType');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Menus', 'mealType', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn('User_Menus', 'mealType', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },
};
