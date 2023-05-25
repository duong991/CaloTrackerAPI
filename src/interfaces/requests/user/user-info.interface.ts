export interface IUpdateInfoUserRequest {
    weight: number;
    height: number;
    activityLevel: string;
    gender: boolean;
    BMR: number;
    target: 'Giảm cân' | 'Tăng cân' | 'Giữ nguyên cân nặng';
    lastTimeToUpdate: string;
    protein: number;
    fat: number;
    carb: number;
}
