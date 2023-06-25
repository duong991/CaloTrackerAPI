import { Request, Response } from 'express';
import FoodManageService from './foodManager.service';
import xlsx from 'xlsx';
export default class FoodManageController {
    public async createFood(req: Request, res: Response): Promise<Response> {
        try {
            const newUser = await FoodManageService.createFood(req.body);
            if (!newUser) {
                return res.status(400).json({ message: 'Food already exists' });
            }
            return res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async updateFood(req: Request, res: Response): Promise<Response> {
        const id = Number(req.query.id);
        console.log(id);
        try {
            const updateFood = await FoodManageService.updateFood(id, req.body);

            if (!updateFood) {
                return res.status(404).json({ message: 'Food not found' });
            }

            return res.status(200).json(updateFood);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async deleteFood(req: Request, res: Response): Promise<Response> {
        const id = Number(req.params.id);

        try {
            const numberOfDeletedRows = await FoodManageService.deleteFood(id);

            if (numberOfDeletedRows === 0) {
                return res.status(404).json({ message: 'Food not found' });
            }
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    public async importExcel(req: Request, res: Response) {
        console.log('hello', req);
        const workbook = xlsx.read(req.file?.buffer, { type: 'buffer' });
        const sheet_name_list = workbook.SheetNames;
        console.log('sheet_name', sheet_name_list);
        const data = xlsx.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]],
        );
        console.log('data', data);
        // try {
        //     await FoodManageService.importFood(data);
        //     return res.status(200).json({ message: 'Import thành công' });
        // } catch (err) {
        //     console.error(err);
        //     return res.status(500).json({ message: 'Lỗi khi import dữ liệu' });
        // }
    }
}
