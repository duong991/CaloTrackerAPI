import { Request, Response } from 'express';
import UserWaterLogService from './waterLog.service';
import moment from 'moment-timezone';
export class WaterLogController {
    public async getWaterLogByUserId(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        try {
            const waterLog = await UserWaterLogService.getWaterLogByUserId(
                userId,
            );
            return res.status(201).json(waterLog);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getWaterLogByDate(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        const date = req.query.date as string;
        const convertDate = new Date(date);

        const today = moment()
            .add(7, 'hours')
            .toDate()
            .toISOString()
            .slice(0, 10);
        try {
            const waterLog = await UserWaterLogService.getWaterLogByDate(
                userId,
                date,
            );

            if (!waterLog && date === today) {
                const newWaterLog = await UserWaterLogService.createWaterLog(
                    userId,
                    { date: convertDate, amount: 0 },
                );
                return res.status(201).json({ amount: newWaterLog.amount });
            } else {
                return res
                    .status(200)
                    .json({ amount: waterLog?.amount ? waterLog.amount : 0 });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async createWaterLog(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        const data = req.body;

        try {
            const waterLog = await UserWaterLogService.createWaterLog(
                userId,
                data,
            );
            return res.status(201).json(waterLog);
        } catch (err) {
            if (err === 'Water log already exists') {
                return res.status(400).json({ message: err });
            }
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateWaterLog(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const userId = req.user.id;
        const { amount, date } = req.body;
        try {
            console.log(userId, amount, date);
            const updatedWaterLog = await UserWaterLogService.updateWaterLog(
                userId,
                date,
                +amount,
            );
            console.log(updatedWaterLog);
            if (!updatedWaterLog) {
                return res.status(404).json({ message: 'Water log not found' });
            }

            return res.status(200).json({ message: 'Water log updated' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
