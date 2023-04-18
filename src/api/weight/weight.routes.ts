import express from 'express';
import { AccManagerController } from './weight.controller';
const router = express.Router();
const controller = new AccManagerController();

router.get('/', controller.getAllAccounts);
router.get('/:id', controller.getAccountById);
router.post('/', controller.createAccount);
router.put('/:id', controller.updateAccount);
router.delete('/:id', controller.deleteAccount);

export { router as AccManagerRouter };
