import express from 'express';
import { WeightLogController } from './weightLog.controller';

const router = express.Router();
const controller = new WeightLogController();

router.get('/', controller.getUserWeightHistoryByUserId);
router.get('/date', controller.getUserWeightHistoryByDate);
router.post('/', controller.createUserWeightHistory);
router.put('/', controller.updateUserWeightHistory);

export { router as WeightLogRouter };
