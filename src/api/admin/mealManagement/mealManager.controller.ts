import { Request, Response } from 'express';
import MealManagerService from './mealManager.service';

export class MealManagerController {
    public async createMeal(req: Request, res: Response): Promise<Response> {
        try {
            const newMeal = await MealManagerService.createMeal(req.body);
            return res.status(201).json(newMeal);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateMeal(req: Request, res: Response): Promise<Response> {
        const id = Number(req.query.id);
        try {
            const updateStatus = await MealManagerService.updateMeal(
                id,
                req.body,
            );
            if (updateStatus) {
                return res.status(200).json({ message: 'Update done' });
            } else {
                return res.status(400).json({ message: 'Invalid request' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteMeal(req: Request, res: Response): Promise<Response> {
        const mealId = Number(req.params.id);
        try {
            const deleteStatus = await MealManagerService.deleteMeal(mealId);
            if (deleteStatus) {
                return res.status(204).json({ message: 'Delete done' });
            } else {
                return res.status(400).json({ message: 'Invalid request' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getDetailMeal(req: Request, res: Response): Promise<Response> {
        const mealId = Number(req.params.id);
        try {
            const meal = await MealManagerService.getDetailMeal(mealId);
            if (meal) {
                return res.status(200).json(meal);
            }
            return res.status(404).json({ message: 'Meal not found' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
