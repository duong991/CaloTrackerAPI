import express from 'express';
import { MenuManagerController } from './menuManager.controller';
import { isAdmin } from '../../../middleware/authorizationToken';

const router = express.Router();
const controller = new MenuManagerController();

router.get('/', controller.getMenus);
router.get('/:id', controller.getMenuById);
router.post('/', isAdmin, controller.createMenu);
router.put('/:id', isAdmin, controller.updateMenu);
router.delete('/:id', isAdmin, controller.deleteMenu);

export { router as MenuManagerRouter };
