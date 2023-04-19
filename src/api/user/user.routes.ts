import express from 'express';
import UserController from './user.controller';

const router = express.Router();
const controller = new UserController();

router.get('/profile', controller.getUserInfo);
router.put('/profile', controller.updateUserInfo);

export { router as UserRouter };
