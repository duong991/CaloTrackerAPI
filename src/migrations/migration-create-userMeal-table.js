'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Meals', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            image: {
                type: Sequelize.BLOB,
                allowNull: true,
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
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
                ),
            },
        });

        // await queryInterface.addConstraint("user_meals", {
        //     type: "foreign key",
        //     fields: ["userId"],
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "cascade",
        //     onUpdate: "cascade",
        //     name: "user_meals_user_id_fk",
        // });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint('User_Meals');
        await queryInterface.dropTable('User_Meals');
    },
};
