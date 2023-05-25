import express from 'express';
import ExrManageController from './exrManager.controller';
import { isAdmin } from '../../../middleware/authorizationToken';

const router = express.Router();
const controller = new ExrManageController();

router.get('/', controller.getAllExr);
router.get('/:id', controller.getExrById);
router.post('/', isAdmin, controller.createExr);
router.put('/:id', isAdmin, controller.updateExr);
router.delete('/:id', isAdmin, controller.deleteExr);

export { router as ExrManageRouter };
