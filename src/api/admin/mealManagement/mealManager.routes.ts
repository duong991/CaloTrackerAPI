import express from 'express';
import { MealManagerController } from './mealManager.controller';
import { isAdmin } from '../../../middleware/authorizationToken';

const router = express.Router();
const controller = new MealManagerController();

router.get('/', controller.getMeals);
router.get('/:id', controller.getMealById);
router.post('/', isAdmin, controller.createMeal);
router.put('/:id', isAdmin, controller.updateMeal);
router.delete('/:id', isAdmin, controller.updateMeal);

export { router as MealManagerRouter };
