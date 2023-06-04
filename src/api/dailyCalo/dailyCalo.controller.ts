import { Request, Response } from 'express';
import DailyCaloService from './dailyCalo.service';
export class DailyCaloController {
    public async getAll(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const dailyCalo = await DailyCaloService.getAll(userId);
            return res.status(201).json({ dailyCalo });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getByDate(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const dailyCalo = await DailyCaloService.getByDate(
                userId,
                req.body,
            );
            return res.status(200).json({ dailyCalo });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            await DailyCaloService.create(userId, req.body);
            return res.status(201).json({ message: 'Daily calo created' });
        } catch (err) {
            console.error(err);
            if (err === 'DailyCalo already exists') {
                return res.status(409).json({ message: err });
            }
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const updateDailyCalo = await DailyCaloService.update(
                userId,
                req.body,
            );
            if (!updateDailyCalo)
                return res.status(404).json({ message: 'DailyCalo not found' });
            return res.status(200).json({ message: 'DailyCalo updated' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        const date = req.body.date;
        try {
            const deleteDailyCalo = await DailyCaloService.delete(userId, date);
            if (!deleteDailyCalo)
                return res.status(404).json({ message: 'DailyCalo not found' });
            return res.status(200).json({ message: 'DailyCalo deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
