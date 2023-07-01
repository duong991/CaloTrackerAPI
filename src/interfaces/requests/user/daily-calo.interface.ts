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
    date: Date;
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
    date: Date;
    exerciseId: IExerciseId[] | null;
}

interface IDataRequestDeleteCaloIntake {
    date: Date;
    foodId: number[] | null;
    mealId: number[] | null;
    userFoodId: number[] | null;
    userMealId: number[] | null;
}

interface IDataRequestDeleteCaloConsumed {
    date: Date;
    exerciseId: number[] | null;
}

export {
    IDataRequestDailyCalo,
    IDataRequestUpdateCaloIntake,
    IDataRequestUpdateCaloConsumed,
    IDataRequestDeleteCaloIntake,
    IDataRequestDeleteCaloConsumed,
};
