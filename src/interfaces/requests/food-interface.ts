interface IFood {
    id: number;
    name: string;
    description?: string;
    image?: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

export default IFood;
