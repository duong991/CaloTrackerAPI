import express from 'express';
import FoodManageController from './foodManager.controller';
import { isAdmin } from '../../../middleware/authorizationToken';

const router = express.Router();
const controller = new FoodManageController();

router.get('/', controller.getAllFood);
router.get('/:id', controller.getFoodById);
router.post('/', isAdmin, controller.createFood);
router.put('/:id', isAdmin, controller.updateFood);
router.delete('/:id', isAdmin, controller.deleteFood);

export { router as FoodManageRouter };
