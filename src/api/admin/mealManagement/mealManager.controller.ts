import { Request, Response } from 'express';
import MealManagerService from './mealManager.service';

export class MealManagerController {
    public async getMeals(req: Request, res: Response): Promise<Response> {
        try {
            const meals = await MealManagerService.getAllMeals();
            return res.status(200).json(meals);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getMealById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const meal = await MealManagerService.getMealById(id);

            if (!meal) {
                return res.status(404).json({ message: 'Meal not found' });
            }

            return res.status(200).json(meal);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
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
        const mealId = +req.params.id;
        try {
            const updateStatus = await MealManagerService.updateMeal(
                mealId,
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
                return res.status(200).json({ message: 'Delete done' });
            } else {
                return res.status(400).json({ message: 'Invalid request' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
