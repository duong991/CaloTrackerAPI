import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const {
    DB_NAME = 'calorie_calculator_app',
    DB_USER = 'root',
    DB_PASSWORD,
    DB_HOST,
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: 3308,
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default connectDB;
