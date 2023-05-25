import { Request, Response } from 'express';
import UserWaterLogService from './waterLog.service';
import { IWaterLog } from '../../interfaces/requests/user/water-log.interface';
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
        const { date } = req.body;
        try {
            const waterLog = await UserWaterLogService.getWaterLogByDate(
                userId,
                date,
            );
            return res.status(200).json(waterLog);
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
            console.error(err);
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
        const waterLogId = +req.params.id;
        const data = req.body;
        try {
            const updatedWaterLog = await UserWaterLogService.updateWaterLog(
                waterLogId,
                data,
            );

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
