import express from 'express';
import FoodManageController from './foodManager.controller';

const router = express.Router();
const controller = new FoodManageController();

router.get('/', controller.getAllFood);
router.get('/:id', controller.getFoodById);
router.post('/', controller.createFood);
router.put('/:id', controller.updateFood);
router.delete('/:id', controller.deleteFood);

export { router as ExrManageRouter };
