import express from 'express';
import { DailyCaloController } from './dailyCalo.controller';

const router = express.Router();
const controller = new DailyCaloController();

router.get('/', controller.getAll);
router.get('/by-date', controller.getByDate);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

export { router as DailyCaloRouter };
