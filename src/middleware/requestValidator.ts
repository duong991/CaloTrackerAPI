import { body, param } from 'express-validator';

export const createFoodValidator = [
    body('userId').isNumeric().notEmpty(),
    body('name').notEmpty(),
    body('calories').isNumeric().notEmpty(),
    body('protein').isNumeric().notEmpty(),
    body('carbohydrates').isNumeric().notEmpty(),
    body('fat').isNumeric().notEmpty(),
    body('food_type').notEmpty(),
];

export const updateFoodValidator = [
    param('id').isNumeric().notEmpty(),
    body('name').notEmpty(),
    body('calories').isNumeric().notEmpty(),
    body('protein').isNumeric().notEmpty(),
    body('carbohydrates').isNumeric().notEmpty(),
    body('fat').isNumeric().notEmpty(),
    body('food_type').notEmpty(),
];
