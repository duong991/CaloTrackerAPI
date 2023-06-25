import express from 'express';
import ExcelController from './excel.controller';

const router = express.Router();
const controller = new ExcelController();

router.get('/food', controller.food);
router.get('/exercise', controller.exercise);
router.get('/meal', controller.meal);

export { router as ExcelRouter };
