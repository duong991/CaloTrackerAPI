import express from 'express';
import UserController from './user.controller';
import authenticateToken from '../../middleware/authenticateToken ';

const router = express.Router();
const controller = new UserController();

router.get('/:userId', authenticateToken, controller.getUserInfo);
router.put('/:userId', controller.updateUserInfo);

export { router as UserRouter };
