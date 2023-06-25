import { Request, Response } from 'express';
import ExcelService from './excel.service';
import Food from '../../models/Food';
import Exercise from '../../models/Exercise';
import Meal from '../../models/Meal';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XlsxPopulate = require('xlsx-populate');

async function createExcelFood(foods: Food[]) {
    const workbook = await XlsxPopulate.fromFileAsync(
        './src/templates/excel/TemplateFood.xlsx',
    );

    const sheet = workbook.sheet('Foods');
    let row = 2;

    foods.forEach((foods, index) => {
        sheet.cell(`A${row}`).value(index + 1);
        sheet.cell(`B${row}`).value(foods.name);
        sheet.cell(`C${row}`).value(foods.calories);
        sheet.cell(`D${row}`).value(foods.protein);
        sheet.cell(`E${row}`).value(foods.fat);
        sheet.cell(`F${row}`).value(foods.carbohydrates);
        row++;
    });

    const filePath = 'caloTracker_food.xlsx';
    await workbook.toFileAsync(filePath);

    return filePath;
}

async function createExcelExercise(exert: Exercise[]) {
    const workbook = await XlsxPopulate.fromFileAsync(
        './src/templates/excel/TemplateFood.xlsx',
    );

    const sheet = workbook.sheet('Excerise');
    let row = 2;

    exert.forEach((exr, index) => {
        sheet.cell(`A${row}`).value(index + 1);
        sheet.cell(`B${row}`).value(exr.name);
        sheet.cell(`C${row}`).value(exr.caloriesBurned);
        sheet.cell(`D${row}`).value(exr.duration);
        row++;
    });

    const filePath = 'caloTracker_exercise.xlsx';
    await workbook.toFileAsync(filePath);

    return filePath;
}

async function createExcelMeal(data: Meal[]) {
    const workbook = await XlsxPopulate.fromFileAsync(
        './src/templates/excel/TemplateFood.xlsx',
    );

    const sheet = workbook.sheet('Meal');
    let row = 2;

    data.forEach((meal, index) => {
        sheet.cell(`A${row}`).value(index + 1);
        sheet.cell(`B${row}`).value(meal.name);
        sheet.cell(`C${row}`).value(meal.description);
        sheet.cell(`D${row}`).value(meal.calories);
        sheet.cell(`E${row}`).value(meal.protein);
        sheet.cell(`F${row}`).value(meal.fat);
        sheet.cell(`G${row}`).value(meal.carbohydrates);
        sheet.cell(`H${row}`).value(meal.mealType);
        row++;
    });

    const filePath = 'caloTracker_meal.xlsx';
    await workbook.toFileAsync(filePath);

    return filePath;
}

export default class ExcelController {
    public async food(req: Request, res: Response) {
        try {
            const data = await ExcelService.exportExcelFood();
            const filePath = await createExcelFood(data);
            return res.download(filePath);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async exercise(req: Request, res: Response) {
        try {
            const data = await ExcelService.exportExcelExercise();
            const filePath = await createExcelExercise(data);
            return res.download(filePath);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async meal(req: Request, res: Response) {
        try {
            const data = await ExcelService.exportExcelMeal();
            const filePath = await createExcelMeal(data);
            return res.download(filePath);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}
