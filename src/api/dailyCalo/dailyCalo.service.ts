import DailyCalo from '../../models/DailyCalo';
import CaloConsumedMapping from '../../models/CaloConsumedMapping';
import CaloIntakeMapping from '../../models/CaloIntakeMapping';
import {
    IDataRequestUpdateCaloIntake,
    IDataRequestUpdateCaloConsumed,
    IDataRequestDeleteCaloIntake,
    IDataRequestDeleteCaloConsumed,
} from '../../interfaces/requests/user/daily-calo.interface';
import { Transaction } from 'sequelize';
import { sequelize } from '../../config/connectDB';
import { Op } from 'sequelize';

interface IDailyCaloService {
    getAll: (userId: number) => Promise<DailyCalo[] | null>;
    getByDate: (userId: number, date: string) => Promise<DailyCalo | null>;
    createDailyCalo: (userId: number, date: Date) => Promise<DailyCalo | null>;
    update_CaloIntake: (
        id: number,
        req: IDataRequestUpdateCaloIntake,
    ) => Promise<boolean | null>;

    update_CaloConsumed: (
        id: number,
        req: IDataRequestUpdateCaloConsumed,
    ) => Promise<boolean | null>;
    delete_CaloIntake: (
        userId: number,
        req: IDataRequestDeleteCaloIntake,
    ) => Promise<boolean | null>;

    delete_CaloConsumed: (
        userId: number,
        req: IDataRequestDeleteCaloConsumed,
    ) => Promise<boolean | null>;
}
const DailyCaloService: IDailyCaloService = {
    getAll: async (userId: number): Promise<DailyCalo[] | null> => {
        const dailyCalos = await DailyCalo.findAll({
            where: { userId: userId },
        });
        return dailyCalos;
    },

    getByDate: async (
        userId: number,
        date: string,
    ): Promise<DailyCalo | null> => {
        const dailyCalo = await DailyCalo.findOne({
            where: { userId: userId, date: date },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'userId'],
            },
            include: [
                {
                    model: CaloIntakeMapping,
                    as: 'caloIntakeMappings',
                    attributes: [
                        'id',
                        'foodId',
                        'userFoodId',
                        'mealId',
                        'userMealId',
                        'servingSize',
                        'mealType',
                    ],
                },
                {
                    model: CaloConsumedMapping,
                    as: 'caloConsumedMappings',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'dailyCaloId'],
                    },
                },
            ],
        });
        return dailyCalo;
    },

    createDailyCalo: async (
        userId: number,
        date: Date,
    ): Promise<DailyCalo | null> => {
        const dailyCalo = await DailyCalo.create({
            userId: userId,
            date: date,
        });
        return dailyCalo;
    },

    update_CaloIntake: async (
        userId: number,
        req: IDataRequestUpdateCaloIntake,
    ) => {
        const t: Transaction = await sequelize.transaction();
        const data: IDataRequestUpdateCaloIntake = req;
        const dailyCaloUpdate = await DailyCalo.findOne({
            where: {
                userId: userId,
                date: data.date,
            },
        });

        if (!dailyCaloUpdate) {
            await t.rollback();
            return null;
        }

        try {
            // TODO: Xử lý cập nhật dữ liệu trong bảng DailyCalo

            // Xử lý cập nhật dữ liệu trong bảng CaloIntake
            if (
                data.foodId ||
                data.userFoodId ||
                data.mealId ||
                data.userMealId
            ) {
                await CaloIntakeMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                    },
                    transaction: t,
                });

                const caloIntakeData = [];

                if (data.foodId) {
                    for (const food of data.foodId) {
                        caloIntakeData.push({
                            dailyCaloId: dailyCaloUpdate.id,
                            foodId: food.id,
                            servingSize: food.servingSize,
                            mealType: food.mealType,
                        });
                    }
                }

                if (data.userFoodId) {
                    for (const userFood of data.userFoodId) {
                        caloIntakeData.push({
                            dailyCaloId: dailyCaloUpdate.id,
                            userFoodId: userFood.id,
                            servingSize: userFood.servingSize,
                            mealType: userFood.mealType,
                        });
                    }
                }

                if (data.mealId) {
                    for (const meal of data.mealId) {
                        caloIntakeData.push({
                            dailyCaloId: dailyCaloUpdate.id,
                            mealId: meal.id,
                            mealType: meal.mealType,
                        });
                    }
                }

                if (data.userMealId) {
                    for (const userMeal of data.userMealId) {
                        caloIntakeData.push({
                            dailyCaloId: dailyCaloUpdate.id,
                            userMealId: userMeal.id,
                            mealType: userMeal.mealType,
                        });
                    }
                }

                await CaloIntakeMapping.bulkCreate(caloIntakeData, {
                    transaction: t,
                });
            }

            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            console.error(error);
            return false;
        }
    },

    update_CaloConsumed: async (
        userId: number,
        req: IDataRequestUpdateCaloConsumed,
    ) => {
        const t: Transaction = await sequelize.transaction();
        const data: IDataRequestUpdateCaloConsumed = req;
        const dailyCaloUpdate = await DailyCalo.findOne({
            where: {
                userId: userId,
                date: data.date,
            },
        });

        if (!dailyCaloUpdate) {
            await t.rollback();
            return null;
        }

        try {
            if (data.exerciseId) {
                await CaloConsumedMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                    },
                    transaction: t,
                });

                const caloConsumedData = [];
                for (const exercise of data.exerciseId) {
                    caloConsumedData.push({
                        dailyCaloId: dailyCaloUpdate.id,
                        exerciseId: exercise.id,
                        duration: exercise.duration,
                    });
                }
                await CaloConsumedMapping.bulkCreate(caloConsumedData, {
                    transaction: t,
                });
            }
            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            console.error(error);
            return false;
        }
    },

    delete_CaloIntake: async (
        userId: number,
        req: IDataRequestDeleteCaloIntake,
    ) => {
        const t: Transaction = await sequelize.transaction();
        const data: IDataRequestDeleteCaloIntake = req;
        const dailyCaloUpdate = await DailyCalo.findOne({
            where: {
                userId: userId,
                date: data.date,
            },
        });

        if (!dailyCaloUpdate) {
            await t.rollback();
            return null;
        }

        try {
            if (data.foodId) {
                await CaloIntakeMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                        foodId: {
                            [Op.in]: data.foodId,
                        },
                    },
                    transaction: t,
                });
            }

            if (data.userFoodId) {
                await CaloIntakeMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                        userFoodId: {
                            [Op.in]: data.userFoodId,
                        },
                    },
                    transaction: t,
                });
            }

            if (data.mealId) {
                await CaloIntakeMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                        mealId: {
                            [Op.in]: data.mealId,
                        },
                    },
                    transaction: t,
                });
            }

            if (data.userMealId) {
                await CaloIntakeMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                        userMealId: {
                            [Op.in]: data.userMealId,
                        },
                    },
                    transaction: t,
                });
            }

            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            console.error(error);
            return false;
        }
    },

    delete_CaloConsumed: async (
        userId: number,
        req: IDataRequestDeleteCaloConsumed,
    ) => {
        const t: Transaction = await sequelize.transaction();
        const data: IDataRequestDeleteCaloConsumed = req;
        const dailyCaloUpdate = await DailyCalo.findOne({
            where: {
                userId: userId,
                date: data.date,
            },
        });

        if (!dailyCaloUpdate) {
            await t.rollback();
            return null;
        }

        try {
            if (data.exerciseId) {
                await CaloIntakeMapping.destroy({
                    where: {
                        dailyCaloId: dailyCaloUpdate.id,
                        userFoodId: {
                            [Op.in]: data.exerciseId,
                        },
                    },
                    transaction: t,
                });
            }

            await t.commit();
            return true;
        } catch (error) {
            await t.rollback();
            console.error(error);
            return false;
        }
    },
};

export default DailyCaloService;
