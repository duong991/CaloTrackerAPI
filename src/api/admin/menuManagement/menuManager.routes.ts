import express from 'express';
import { MenuManagerController } from './menuManager.controller';

const router = express.Router();
const controller = new MenuManagerController();

router.get('/', controller.getMenus);
router.get('/:id', controller.getMenuById);
router.post('/', controller.createMenu);
router.put('/:id', controller.updateMenu);
router.delete('/:id', controller.deleteMenu);

export { router as MenuManagerRouter };
