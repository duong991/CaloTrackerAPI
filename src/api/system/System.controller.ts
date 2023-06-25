import { Request, Response } from 'express';
import SystemService from './System.service';

export default class SystemController {
    public async getExrById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const exr = await SystemService.getExrById(id);

            if (!exr) {
                return res.status(404).json({ message: 'Exercise not found' });
            }

            return res.status(200).json(exr);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getAllExr(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        try {
            const exercises = await SystemService.getAllExr();
            return res.status(200).json({ items: exercises });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getFoodById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const food = await SystemService.getFoodById(id);

            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }

            return res.status(200).json(food);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getAllFood(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        try {
            const foods = await SystemService.getAllFood();
            return res.status(200).json({ items: foods });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getMeals(req: Request, res: Response): Promise<Response> {
        try {
            const meals = await SystemService.getAllMeals();
            return res.status(200).json({ items: meals });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getMealById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const meal = await SystemService.getMealById(id);

            if (!meal) {
                return res.status(404).json({ message: 'Meal not found' });
            }

            return res.status(200).json(meal);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getFoodPaper(req: Request, res: Response) {
        const start = parseInt(req.query.start as string);
        const length = parseInt(req.query.length as string);

        try {
            const foodPaper = await SystemService.getFoodPaper({
                start,
                length,
            });
            return res.status(200).json(foodPaper);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getExercisePaper(req: Request, res: Response) {
        const start = parseInt(req.query.start as string);
        const length = parseInt(req.query.length as string);

        try {
            const exercisePaper = await SystemService.getExercisePaper({
                start,
                length,
            });
            return res.status(200).json(exercisePaper);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getMealPaper(req: Request, res: Response) {
        const start = parseInt(req.query.start as string);
        const length = parseInt(req.query.length as string);

        try {
            const mealPaper = await SystemService.getMealPaper({
                start,
                length,
            });
            return res.status(200).json(mealPaper);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
