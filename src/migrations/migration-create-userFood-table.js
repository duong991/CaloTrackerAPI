'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Foods', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // references: {
                //     model: "User",
                //     key: "id",
                // },
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            calories: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            protein: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            carbohydrates: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            fat: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });

        // await queryInterface.addConstraint("UserFoods", {
        //     type: "foreign key",
        //     fields: ["userId"],
        //     name: "user_food_user_id_fk",
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "CASCADE",
        // });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint(
            'UserFoods',
            'user_food_user_id_fk',
        );
        await queryInterface.dropTable('User_Foods');
    },
};
