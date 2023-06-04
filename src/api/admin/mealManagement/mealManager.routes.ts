import express from 'express';
import { MealManagerController } from './mealManager.controller';

const router = express.Router();
const controller = new MealManagerController();

router.post('/', controller.createMeal);
router.put('/:id', controller.updateMeal);
router.delete('/:id', controller.updateMeal);

export { router as MealManagerRouter };
