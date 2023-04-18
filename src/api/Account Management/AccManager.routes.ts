import express from 'express';
import AccManagerController from './AccManager.controller';

const router = express.Router();
const controller = new AccManagerController();

router.get('/', controller.getAllAccounts);
router.get('/:id', controller.getAccountById);
router.post('/', controller.createAccount);
router.put('/:id', controller.updateAccount);
router.delete('/:id', controller.deleteAccount);
router.get('/abc', controller.getAllAccounts);

export { router as AccManagerRouter };
