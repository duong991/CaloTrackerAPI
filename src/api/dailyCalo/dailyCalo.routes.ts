import express from 'express';
import { DailyCaloController } from './dailyCalo.controller';

const router = express.Router();
const controller = new DailyCaloController();

router.get('/', controller.getAll);
router.get('/by-date', controller.getByDate);
router.put('/calo-intake', controller.update_CaloIntake);
router.put('/calo-consumed', controller.update_CaloConsumed);
router.post('/calo-intake', controller.delete_CaloIntake);
router.post('/calo-consumed', controller.delete_CaloConsumed);

export { router as DailyCaloRouter };
