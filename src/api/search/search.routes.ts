import express from 'express';
import { SearchController } from './search.controller';

const router = express.Router();
const controller = new SearchController();

router.get('/user-foods', controller.searchUserFoods);
router.get('/foods', controller.searchFoods);
router.get('/meals', controller.searchMeals);
router.get('/user-meals', controller.searchUserMeals);
router.get('/foods-and-user-foods', controller.searchFoodsAndUserFoods);
router.get('/meals-and-user-meals', controller.searchMealsAndUserMeals);
router.get('/exercises', controller.searchExercises);

export { router as SearchRouter };
