import express from 'express';
import SystemController from './System.controller';

const router = express.Router();
const controller = new SystemController();

router.get('/exercise', controller.getAllExr);
router.get('/exercise/:id', controller.getExrById);
router.get('/food', controller.getAllFood);
router.get('/food/:id', controller.getFoodById);
router.get('/', controller.getMeals);
router.get('/:id', controller.getMealById);

export { router as SystemRouter };
