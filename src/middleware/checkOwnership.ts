import { Request, Response, NextFunction } from 'express';
import UserFoodService from '../api/food/food.service';

const checkFoodOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const foodId = +req.params.id;
    const userId = req.user.id; // assume that user information is extracted from JWT token

    try {
        const food = await UserFoodService.getFoodById(foodId);

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        if (food.userId !== userId) {
            return res.status(403).json({
                message: 'You are not authorized to perform this action',
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
const checkArrFoodOwnership = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userId = req.user.id;
    const foodIds = req.body.ids;

    try {
        // Kiểm tra xem tất cả các món ăn thuộc ids truyền lên có thuộc về userId hay không
        const isUserFoods = await UserFoodService.checkUserFoods(
            foodIds,
            userId,
        );
        if (!isUserFoods) {
            return res
                .status(403)
                .json({ message: 'Bạn không có quyền xóa các món ăn này.' });
        }
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
export { checkFoodOwnership, checkArrFoodOwnership };
