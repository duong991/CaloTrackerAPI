import { Request, Response } from 'express';
import UserFoodService from './food.service';
export class UserFoodController {
    public async getAllFoods(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        try {
            const foods = await UserFoodService.getAllFoods(userId);
            return res.status(200).json({ items: foods });
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
        const userId = req.user.id;
        try {
            await UserFoodService.createFood(userId, req.body);
            return res.status(201).json({ message: 'Food created' });
        } catch (err) {
            console.error(err);
            if (err === 'Food already exists') {
                return res.status(409).json({ message: err });
            }
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateFood(req: Request, res: Response): Promise<Response> {
        try {
            const updatedFood = await UserFoodService.updateFood(req.body.data);
            if (!updatedFood)
                return res.status(404).json({ message: 'Food not found' });
            return res.status(200).json({ message: 'Food updated' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteFood(req: Request, res: Response): Promise<Response> {
        const userId = req.user.id;
        const foodId = req.body.foodId;
        try {
            const deleteFood = await UserFoodService.deleteFood(userId, foodId);
            if (!deleteFood)
                return res.status(404).json({ message: 'Food not found' });
            return res.status(200).json({ message: 'Food deleted' });
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
