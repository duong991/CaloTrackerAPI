import { Request, Response } from 'express';
import ExrManageService from './exrManager.service';

export default class ExrManageController {
    public async createExr(req: Request, res: Response): Promise<Response> {
        try {
            const newExr = await ExrManageService.createExr(req.body);
            if (!newExr) {
                return res
                    .status(400)
                    .json({ message: 'Exercise already exists' });
            }
            return res
                .status(201)
                .json({ message: 'Exercise created successfully' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateExr(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const [numberOfAffectedRows, [updateExr]] =
                await ExrManageService.updateExr(id, req.body);

            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: 'Exercise not found' });
            }

            return res.status(200).json(updateExr);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteExr(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const numberOfDeletedRows = await ExrManageService.deleteExr(id);

            if (numberOfDeletedRows === 0) {
                return res.status(404).json({ message: 'Exercise not found' });
            }
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
