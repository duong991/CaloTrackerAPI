import express from 'express';
import { MealManagerController } from './mealManager.controller';

const router = express.Router();
const controller = new MealManagerController();

router.post('/', controller.createMeal);
router.put('', controller.updateMeal);
router.delete('/:id', controller.deleteMeal);
router.get('/:id', controller.getDetailMeal);

export { router as MealManagerRouter };
