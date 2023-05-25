import express from 'express';
import { WaterLogController } from './waterLog.controller';

const router = express.Router();
const controller = new WaterLogController();

router.get('/', controller.getWaterLogByUserId);
router.get('/date', controller.getWaterLogByDate);
router.post('/', controller.createWaterLog);
router.put('/:id', controller.updateWaterLog);

export { router as WaterLogRouter };
