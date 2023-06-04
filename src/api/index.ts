import express from 'express';

import { AccManagerRouter } from './admin/accountManagement/AccManager.routes';
import { FoodManageRouter } from './admin/foodManagement/foodManager.routes';
import { MealManagerRouter } from './admin/mealManagement/mealManager.routes';
import { MenuManagerRouter } from './admin/menuManagement/menuManager.routes';
import { ExrManageRouter } from './admin/exerciseManagement/exrManager.routes';
import { SystemRouter } from './system/System.routes';
import { AuthRouter } from './auth/auth.routes';
import { FoodRouter } from './food/food.routes';
import { UserRouter } from './user/user.routes';
import { MealRouter } from './meal/meal.routes';
import { MenuRouter } from './menu/menu.routes';
import { dataRouter } from './data/data.routes';
import { WaterLogRouter } from './waterLog/waterLog.routes';
import { WeightLogRouter } from './weightLog/weightLog.routes';
import { DailyCaloRouter } from './dailyCalo/dailyCalo.routes';
import authenticateToken from '../middleware/authenticateToken ';
import { isAdmin } from '../middleware/authorizationToken';
const router = express.Router();

// router for authentication
router.use('/auth', AuthRouter);

// router for data
router.use('/data', authenticateToken, dataRouter);

// router for admin need to be protected by admin role
router.use('/manager-account', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-food', authenticateToken, isAdmin, FoodManageRouter);
router.use('/manager-meal', authenticateToken, isAdmin, MealManagerRouter);
router.use('/manager-exercise', authenticateToken, isAdmin, ExrManageRouter);
router.use('/manager-menu', authenticateToken, isAdmin, MenuManagerRouter);

// router for user need to be protected by user role
router.use('/system', SystemRouter);
router.use('/users', authenticateToken, UserRouter);
router.use('/foods', authenticateToken, FoodRouter);
router.use('/meals', authenticateToken, MealRouter);
router.use('/menus', authenticateToken, MenuRouter);

router.use('/weight-log', authenticateToken, WeightLogRouter);
router.use('/water-log', authenticateToken, WaterLogRouter);
router.use('/exercise', authenticateToken, UserRouter);
router.use('/daily-menu', authenticateToken, UserRouter);
router.use('/daily-calo', authenticateToken, DailyCaloRouter);

export default router;
