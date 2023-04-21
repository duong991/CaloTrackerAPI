import { Request, Response } from 'express';
import MenuManagerService from './menuManager.service';

export class MenuManagerController {
    public async getMenus(req: Request, res: Response): Promise<Response> {
        try {
            const meals = await MenuManagerService.getAllMenus();
            return res.status(200).json(meals);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getMenuById(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);
        try {
            const meal = await MenuManagerService.getMenuById(id);

            if (!meal) {
                return res.status(404).json({ message: 'Meal not found' });
            }

            return res.status(200).json(meal);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    public async createMenu(req: Request, res: Response): Promise<Response> {
        try {
            const newMeal = await MenuManagerService.createMenu(req.body);
            return res.status(201).json(newMeal);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateMenu(req: Request, res: Response): Promise<Response> {
        const mealId = +req.params.id;
        try {
            const updateStatus = await MenuManagerService.updateMenu(
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

    public async deleteMenu(req: Request, res: Response): Promise<Response> {
        const mealId = Number(req.params.id);
        try {
            const deleteStatus = await MenuManagerService.deleteMenu(mealId);
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
