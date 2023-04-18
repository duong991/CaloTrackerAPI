import express from 'express';
import { AccManagerRouter } from './Account Management/AccManager.routes';
import { AuthRouter } from './auth/auth.routes';
import { UserRouter } from './user/user.routes';
import authenticateToken from '../middleware/authenticateToken ';
import { isAdmin } from '../middleware/authorizationToken';
const router = express.Router();

router.use('/manager-account', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-food', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-meal', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-exercise', authenticateToken, isAdmin, AccManagerRouter);
router.use('/manager-menu', authenticateToken, isAdmin, AccManagerRouter);
router.use('/auth', AuthRouter);
router.use('/user', authenticateToken, UserRouter);
router.use('/food', authenticateToken, UserRouter);
router.use('/meal', authenticateToken, UserRouter);
router.use('/weight', authenticateToken, UserRouter);
router.use('/exercise', authenticateToken, UserRouter);
router.use('/menu', authenticateToken, UserRouter);
router.use('/daily-menu', authenticateToken, UserRouter);

export default router;
