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
import UserInfo from './models/UserInfo';
import Exercise from './models/Exercise';
import Food from './models/Food';
import Meal from './models/Meal';
// import Menu from './models/Menu';
import Token from './models/Token';
import UserExercise from './models/UserExercise';
import UserFood from './models/UserFood';
import UserMeal from './models/UserMeal';
import UserMealFood from './models/UserMealFood';
// import UserMealMenu from './models/UserMealMenu';
import WaterLog from './models/WaterLog';
import UserWeightHistory from './models/UserWeightHistory';
// import UserMenu from './models/UserMenu';
import DailyCalo from './models/DailyCalo';
import CaloIntakeMapping from './models/CaloIntakeMapping';
import MealFood from './models/MealFood';
// import MealMenu from './models/MealMenu';
import moment from 'moment-timezone';

// Đặt múi giờ mặc định cho toàn bộ ứng dụng
moment.tz.setDefault('Asia/Ho_Chi_Minh');

dotenv.config();

const app = express();

console.log(moment().toDate());

// Gọi hàm associate() cho các model đã import
Token.associate();
User.associate();
UserInfo.associate();

Exercise.associate();
UserExercise.associate();

Food.associate();
UserFood.associate();

Meal.associate();
UserMeal.associate();

// Menu.associate();
// UserMenu.associate();

MealFood.associate();
UserMealFood.associate();
// MealMenu.associate();
// UserMealMenu.associate();

DailyCalo.associate();
CaloIntakeMapping.associate();

UserWeightHistory.associate();
WaterLog.associate();

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
