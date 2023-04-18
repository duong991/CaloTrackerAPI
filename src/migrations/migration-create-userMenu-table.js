'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Menus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                // references: {
                //     model: "User",
                //     key: "id",
                // },
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(50),
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            mealType: {
                allowNull: false,
                type: Sequelize.ENUM('breakfast', 'lunch', 'dinner', 'snacks'),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        // await queryInterface.addConstraint("UserMenus", {
        //     type: "foreign key",
        //     fields: ["userId"],
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        // });

        // await queryInterface.addIndex("UserMenus", ["userId"]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User_Menus');
    },
};
