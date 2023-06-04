import { Request, Response } from 'express';
import FoodManageService from './foodManager.service';

export default class FoodManageController {
    public async createFood(req: Request, res: Response): Promise<Response> {
        try {
            const newUser = await FoodManageService.createFood(req.body);
            if (!newUser) {
                return res.status(400).json({ message: 'Food already exists' });
            }
            return res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateFood(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const [numberOfAffectedRows, [updateFood]] =
                await FoodManageService.updateFood(id, req.body);

            if (numberOfAffectedRows === 0) {
                return res.status(404).json({ message: 'Food not found' });
            }

            return res.status(200).json(updateFood);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteFood(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const numberOfDeletedRows = await FoodManageService.deleteFood(id);

            if (numberOfDeletedRows === 0) {
                return res.status(404).json({ message: 'Food not found' });
            }
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
