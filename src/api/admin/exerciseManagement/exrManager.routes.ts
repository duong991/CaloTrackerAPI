import express from 'express';
import ExrManageController from './exrManager.controller';

const router = express.Router();
const controller = new ExrManageController();

router.get('/', controller.getAllExr);
router.get('/:id', controller.getExrById);
router.post('/', controller.createExr);
router.put('/:id', controller.updateExr);
router.delete('/:id', controller.deleteExr);

export { router as ExrManageRouter };
