import { Request, Response } from 'express';
import DataService from './data.service';

export class DataController {
    public async getAllData(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const data = await DataService.getAllData(userId);
            return res.status(200).json(data);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
