'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            role: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "UserInfos",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "UserExercises",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "UserWeightHistories",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "WaterLogs",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "UserFoods",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "UserMeals",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "UserMenus",
        //         field: "userId",
        //     },
        // });

        // await queryInterface.addConstraint("Users", {
        //     type: "foreign key",
        //     name: "userId_fk",
        //     fields: ["id"],
        //     references: {
        //         table: "DailyMenus",
        //         field: "userId",
        //     },
        // });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    },
};
