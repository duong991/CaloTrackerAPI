import express from 'express';
import { UserFoodController } from './food.controller';
import {
    checkFoodOwnership,
    checkArrFoodOwnership,
} from '../../middleware/checkOwnership';
import {
    createFoodValidator,
    updateFoodValidator,
} from '../../middleware/requestValidator';
const router = express.Router();
const controller = new UserFoodController();

router.get('/', controller.getAllFoods);
router.get('/:id', checkFoodOwnership, controller.getFoodById);
router.post('/', createFoodValidator, controller.createFood);
router.put(
    '/:id',
    checkFoodOwnership,
    updateFoodValidator,
    controller.updateFood,
);
router.delete('/:', checkArrFoodOwnership, controller.deleteFoods);

export { router as FoodRouter };
