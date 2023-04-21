interface ICreateUserFood {
    userId: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface IUpdateUserFood {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export { ICreateUserFood, IUpdateUserFood };
