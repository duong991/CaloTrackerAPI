interface ICreateFood {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface IUpdateFood {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}
export { ICreateFood, IUpdateFood };
