import express from 'express';
import { WeightLogController } from './weightLog.controller';

const router = express.Router();
const controller = new WeightLogController();

router.get('/get-all', controller.getUserWeightHistoryByUserId);
router.get('/get-by-date', controller.getUserWeightHistoryByDate);
router.post('/', controller.createUserWeightHistory);
router.put('/', controller.updateUserWeightHistory);

export { router as WeightLogRouter };
