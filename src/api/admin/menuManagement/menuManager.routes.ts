import express from 'express';
import { MenuManagerController } from './menuManager.controller';
const router = express.Router();
const controller = new MenuManagerController();

// GET /menus - Lấy danh sách tất cả các thực đơn của hệ thống
router.get('/', controller.getMenus);

// GET / menus /: id - Lấy thông tin chi tiết của một bữa ăn cụ thể bằng id
router.get('/:id', controller.getMenuById);

// POST / menus - Tạo một bữa ăn mới cho hệ thống
router.post('/', controller.createMenu);

// PUT / menus /: id - Cập nhật thông tin của một bữa ăn cụ thể bằng id
router.put('/:id', controller.updateMenu);

// DELETE / menus /: id - Xóa một bữa ăn cụ thể bằng id
router.delete('/:id', controller.deleteMenu);

export { router as MenuRouter };
