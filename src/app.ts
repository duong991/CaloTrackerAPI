import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectDB, { sequelize } from './config/connectDB';

import { cronJobDeleteExpiredTokens } from './services/cron';
import api from './api';
import dotenv from 'dotenv';

// Import các model cần gọi hàm associate()
import User from './models/User';
import DailyMenu from './models/DailyMenu';
import Exercise from './models/Exercise';
import Food from './models/Food';
import Meal from './models/Meal';
import Menu from './models/Menu';
import Token from './models/Token';
import UserExercise from './models/UserExercise';
import UserFood from './models/UserFood';
import UserMeal from './models/UserMeal';
import UserMealFood from './models/UserMealFood';
import UserMealMenu from './models/UserMealMenu';
import WaterLog from './models/WaterLog';
import UserWeightHistory from './models/UserWeightHistory';

dotenv.config();

const app = express();

// Gọi hàm associate() cho các model đã import
User.associate();
DailyMenu.associate();
Exercise.associate();
Food.associate();
Meal.associate();
Menu.associate();
Token.associate();
UserExercise.associate();
UserFood.associate();
UserMeal.associate();
UserMealFood.associate();
UserMealMenu.associate();
WaterLog.associate();
UserWeightHistory.associate();

cronJobDeleteExpiredTokens.start();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

connectDB().then(() => {
    sequelize.sync().then(() => {
        app.use('/api/v1', api);
    });
});

export default app;
