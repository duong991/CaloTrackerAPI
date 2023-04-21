import { Request, Response } from 'express';
import UserFoodService from './food.service';
export class UserFoodController {
    public async getAllFoods(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const foods = await UserFoodService.getAllFoods(userId);
            return res.status(201).json(foods);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async getFoodById(req: Request, res: Response): Promise<Response> {
        const foodId = +req.params.id;
        try {
            const food = await UserFoodService.getFoodById(foodId);
            return res.status(200).json(food);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async createFood(req: Request, res: Response): Promise<Response> {
        try {
            const food = await UserFoodService.createFood(req.body);
            return res.status(201).json(food);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateFood(req: Request, res: Response): Promise<Response> {
        const foodId = Number(req.params.id);
        try {
            const updatedFood = await UserFoodService.updateFood(
                foodId,
                req.body,
            );

            return res.status(200).json(updatedFood);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteFoods(req: Request, res: Response): Promise<Response> {
        const { ids } = req.body;

        try {
            const numberOfDeletedRows = await UserFoodService.deleteFoods(ids);

            if (numberOfDeletedRows === 0) {
                return res
                    .status(404)
                    .json({ message: 'No foods were deleted' });
            }

            return res
                .status(200)
                .json({ message: `${numberOfDeletedRows} row(s) deleted` });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
