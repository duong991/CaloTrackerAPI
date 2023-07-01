import express from 'express';
import UserController from './user.controller';

const router = express.Router();
const controller = new UserController();

router.get('/', controller.getUserInfo);
router.post('/', controller.createUserInfo);
router.put('/', controller.updateUserInfo);

router.put('/weight', controller.updateWeight);

export { router as UserRouter };
