'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User_Weight_Histories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                // unique: true,
                type: Sequelize.INTEGER,
                // references: {
                //     model: {
                //         tableName: "Users",
                //     },
                //     key: "id",
                // },
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            weight: {
                allowNull: false,
                type: Sequelize.FLOAT,
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
        // await queryInterface.addConstraint("UserWeightHistories", {
        //     fields: ["userId"],
        //     type: "foreign key",
        //     name: "UserWeightHistory_userId_fk",
        //     references: {
        //         table: "Users",
        //         field: "id",
        //     },
        //     onDelete: "cascade",
        //     onUpdate: "cascade",
        // });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User_Weight_Histories');
    },
};
