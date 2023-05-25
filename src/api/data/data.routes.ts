import express from 'express';
import { DataController } from './data.controller';
const router = express.Router();
const controller = new DataController();

router.get('/', controller.getAllData);

export { router as dataRouter };
