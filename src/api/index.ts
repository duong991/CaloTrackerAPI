import express from 'express';

import { AccManagerRouter } from './admin/accountManagement/AccManager.routes';
import { AuthRouter } from './auth/auth.routes';
import { FoodRouter } from './food/food.routes';
import { UserRouter } from './user/user.routes';
import { MealRouter } from './meal/meal.routes';
import { MenuRouter } from './menu/menu.routes';
import authenticateToken from '../middleware/authenticateToken ';
import { isAdmin } from '../middleware/authorizationToken';

const router = express.Router();

// router for authentication
router.use('/auth', AuthRouter);

// router for admin need to be protected by admin role
router.use('/manager-account', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-food', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-meal', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-exercise', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-menu', authenticateToken, isAdmin, AccManagerRouter);

// router for user need to be protected by user role
router.use('/user', authenticateToken, UserRouter);
router.use('/foods', authenticateToken, FoodRouter);
router.use('/meals', authenticateToken, MealRouter);
router.use('/menus', authenticateToken, MenuRouter);

router.use('/weight', authenticateToken, UserRouter);
router.use('/exercise', authenticateToken, UserRouter);
router.use('/daily-menu', authenticateToken, UserRouter);

export default router;
