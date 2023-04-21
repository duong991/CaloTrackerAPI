import { Request, Response } from 'express';
import AccManagerService from './AccManager.service';

export default class AccManagerController {
    public async createAccount(req: Request, res: Response): Promise<Response> {
        const { email, password, role = true } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' });
        }

        try {
            const newUser = await AccManagerService.createAccount(
                email,
                password,
                role,
            );
            return res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getAccountById(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const user = await AccManagerService.getAccountById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getAllAccounts(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        try {
            const accounts = await AccManagerService.getAllAccounts();
            return res.status(200).json(accounts);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateAccount(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        const { email, role = true } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        try {
            const [numberOfAffectedRows, [updatedUser]] =
                await AccManagerService.updateAccount(id, email, role);

            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(updatedUser);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteAccount(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const numberOfDeletedRows = await AccManagerService.deleteAccount(
                id,
            );

            if (numberOfDeletedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
