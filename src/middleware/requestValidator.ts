import { body, param } from 'express-validator';

export const createFoodValidator = [
    body('name').notEmpty(),
    body('calories').isNumeric().notEmpty(),
    body('protein').isNumeric().notEmpty(),
    body('carbohydrates').isNumeric().notEmpty(),
    body('fat').isNumeric().notEmpty(),
];

export const updateFoodValidator = [
    param('id').isNumeric().notEmpty(),
    body('name').notEmpty(),
    body('calories').isNumeric().notEmpty(),
    body('protein').isNumeric().notEmpty(),
    body('carbohydrates').isNumeric().notEmpty(),
    body('fat').isNumeric().notEmpty(),
];
