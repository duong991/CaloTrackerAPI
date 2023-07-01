import { Request, Response } from 'express';
import SearchService from './search.service';

export class SearchController {
    public async searchUserFoods(req: Request, res: Response): Promise<void> {
        const userId = req.user.id;
        const { keyword } = req.query;
        try {
            const userFoods = await SearchService.searchUserFoods(
                Number(userId),
                keyword as string,
            );
            res.json({ items: userFoods });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async searchFoods(req: Request, res: Response): Promise<void> {
        const { keyword } = req.query;
        try {
            const foods = await SearchService.searchFoods(keyword as string);
            res.json({ items: foods });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async searchMeals(req: Request, res: Response): Promise<void> {
        const { keyword } = req.query;
        try {
            const meals = await SearchService.searchMeals(keyword as string);
            res.json({ items: meals });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async searchUserMeals(req: Request, res: Response): Promise<void> {
        const userId = req.user.id;
        const { keyword } = req.query;
        try {
            const userMeals = await SearchService.searchUserMeals(
                Number(userId),
                keyword as string,
            );
            res.json({ items: userMeals });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public searchFoodsAndUserFoods = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const userId = req.user.id;
        const { keyword } = req.query;

        try {
            const { foods, userFoods } =
                await SearchService.searchFoodsAndUserFoods(
                    Number(userId),
                    keyword as string,
                );

            res.status(200).json({ items: { foods, userFoods } });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    };

    public searchMealsAndUserMeals = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const userId = req.user.id;
        const { keyword } = req.query;

        try {
            const { meals, userMeals } =
                await SearchService.searchMealsAndUserMeals(
                    Number(userId),
                    keyword as string,
                );

            res.status(200).json({ items: { meals, userMeals } });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    };

    public searchExercises = async (
        req: Request,
        res: Response,
    ): Promise<void> => {
        const { keyword } = req.query;

        try {
            const exercises = await SearchService.searchExercises(
                keyword as string,
            );

            res.status(200).json({ items: exercises });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    };
}
