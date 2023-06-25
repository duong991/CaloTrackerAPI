interface IDataRequestDailyCalo {
    date: Date;
}

interface IFoodId {
    id: number;
    servingSize: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface IMealId {
    id: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}
interface IDataRequestUpdateCaloIntake {
    date: string;
    foodId: IFoodId[] | null;
    mealId: IMealId[] | null;
    userFoodId: IFoodId[] | null;
    userMealId: IMealId[] | null;
}

interface IExerciseId {
    id: number;
    duration: number;
}
interface IDataRequestUpdateCaloConsumed {
    date: string;
    exerciseId: IExerciseId[] | null;
}

interface IDataRequestDeleteCaloIntake {
    date: string;
    foodId: number[] | null;
    mealId: number[] | null;
    userFoodId: number[] | null;
    userMealId: number[] | null;
}

interface IDataRequestDeleteCaloConsumed {
    date: string;
    exerciseId: number[] | null;
}

export {
    IDataRequestDailyCalo,
    IDataRequestUpdateCaloIntake,
    IDataRequestUpdateCaloConsumed,
    IDataRequestDeleteCaloIntake,
    IDataRequestDeleteCaloConsumed,
};
