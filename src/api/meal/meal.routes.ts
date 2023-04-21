import express from 'express';
import { UserMealController } from './meal.controller';
import { checkMealOwnership } from '../../middleware/checkOwnership';
const router = express.Router();
const controller = new UserMealController();

// GET /meals - Lấy danh sách tất cả các bữa ăn của người dùng
router.get('/', controller.getMeals);

// GET / meals /: id - Lấy thông tin chi tiết của một bữa ăn cụ thể bằng id
router.get('/:id', checkMealOwnership, controller.getMealById);

// POST / meals - Tạo một bữa ăn mới cho người dùng
router.post('/', controller.createMeal);

// PUT / meals /: id - Cập nhật thông tin của một bữa ăn cụ thể bằng id
router.put('/:id', checkMealOwnership, controller.updateMeal);

// DELETE / meals /: id - Xóa một bữa ăn cụ thể bằng id
router.delete('/:id', checkMealOwnership, controller.deleteMeal);

export { router as MealRouter };
