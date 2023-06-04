import { Request, Response } from 'express';
import userWeightHistoryService from './weightLog.service';
import { IWeightLog } from '../../interfaces/requests/user/weight-log.interface';
export class WeightLogController {
    public async getUserWeightHistoryByUserId(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        try {
            const weightLogs =
                await userWeightHistoryService.getUserWeightHistoryByUserId(
                    userId,
                );
            return res.status(201).json(weightLogs);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getUserWeightHistoryByDate(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        const date = req.query.date as string;
        try {
            const weightLog =
                await userWeightHistoryService.getUserWeightHistoryByDate(
                    userId,
                    date,
                );
            return res.status(200).json(weightLog);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async createUserWeightHistory(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        const { date, weight }: IWeightLog = req.body;

        try {
            const weightLog =
                await userWeightHistoryService.createUserWeightHistory(
                    userId,
                    date,
                    weight,
                );
            return res.status(201).json(weightLog);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateUserWeightHistory(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        const { date, weight }: IWeightLog = req.body;
        try {
            const updatedWeightLog =
                await userWeightHistoryService.updateUserWeightHistory(
                    userId,
                    date,
                    weight,
                );

            return res.status(200).json(updatedWeightLog);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
