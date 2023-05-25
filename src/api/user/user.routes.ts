import express from 'express';
import UserController from './user.controller';

const router = express.Router();
const controller = new UserController();

router.get('/', controller.getUserInfo);
router.post('/', controller.createUser);
router.put('/', controller.updateUserInfo);

export { router as UserRouter };
