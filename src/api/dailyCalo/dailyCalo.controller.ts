import { Request, Response } from 'express';
import DailyCaloService from './dailyCalo.service';
import convertToDate from '../../helpers/ConvertTime';
import moment from 'moment-timezone';

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
        const date = req.query.date as string;
        const convertDate = new Date(date);

        const today = moment()
            .add(7, 'hours')
            .toDate()
            .toISOString()
            .slice(0, 10);
        try {
            const dailyCalo = await DailyCaloService.getByDate(userId, date);
            if (dailyCalo === null && date === today) {
                const newDailyCalo = await DailyCaloService.createDailyCalo(
                    userId,
                    convertDate,
                );
                if (newDailyCalo === null)
                    return res
                        .status(404)
                        .json({ message: 'Create fall daily calo' });
                return res.status(201).json({ items: newDailyCalo });
            }
            return res.status(200).json({ items: dailyCalo });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async update_CaloIntake(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        try {
            const updateDailyCalo = await DailyCaloService.update_CaloIntake(
                userId,
                {
                    ...req.body,
                },
            );
            if (updateDailyCalo === null)
                return res.status(404).json({ message: 'DailyCalo not found' });
            return res.status(200).json({ message: 'DailyCalo updated' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async update_CaloConsumed(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        try {
            const updateDailyCalo = await DailyCaloService.update_CaloConsumed(
                userId,
                {
                    ...req.body,
                },
            );
            if (updateDailyCalo === null)
                return res.status(404).json({ message: 'DailyCalo not found' });
            return res.status(200).json({ message: 'DailyCalo updated' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async delete_CaloIntake(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        try {
            const deleteDailyCalo = await DailyCaloService.delete_CaloIntake(
                userId,
                req.body,
            );
            if (!deleteDailyCalo)
                return res.status(404).json({ message: 'DailyCalo not found' });
            return res.status(200).json({ message: 'DailyCalo deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async delete_CaloConsumed(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        try {
            const deleteDailyCalo = await DailyCaloService.delete_CaloConsumed(
                userId,
                req.body,
            );
            if (!deleteDailyCalo)
                return res.status(404).json({ message: 'DailyCalo not found' });
            return res.status(200).json({ message: 'DailyCalo deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
