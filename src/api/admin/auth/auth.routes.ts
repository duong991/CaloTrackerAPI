import express from 'express';
import AuthController from './auth.controller';
const router = express.Router();
const controller = new AuthController();

router.post('/login', controller.login);

export { router as AuthWebRouter };
