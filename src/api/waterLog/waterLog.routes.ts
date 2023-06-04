import express from 'express';
import { WaterLogController } from './waterLog.controller';

const router = express.Router();
const controller = new WaterLogController();

// router.get('/', controller.getWaterLogByUserId);
router.get('/', controller.getWaterLogByDate);
router.post('/', controller.createWaterLog);
router.put('/', controller.updateWaterLog);

export { router as WaterLogRouter };
