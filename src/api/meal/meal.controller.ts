import { Request, Response } from 'express';
import UserMealService from './meal.service';

export class UserMealController {
    public async getMeals(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const meals = await UserMealService.getAllMealsByUserId(userId);
            return res.status(200).json({ items: meals });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getMealById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const meal = await UserMealService.getMealById(id);

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
        const userId = req.user.id;
        try {
            await UserMealService.createMeal(userId, req.body);
            return res.status(201).json({ message: 'Meal created' });
        } catch (err) {
            console.error(err);
            if (err === 'Meal already exists') {
                return res.status(409).json({ message: err });
            }
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateMeal(req: Request, res: Response): Promise<Response> {
        const mealId = +req.params.id;
        try {
            const updateStatus = await UserMealService.updateMeal(
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
        const mealId = req.body.mealId;
        try {
            const deleteStatus = await UserMealService.deleteMeal(mealId);
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
