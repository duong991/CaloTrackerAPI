/* eslint-disable prettier/prettier */
export interface IUpdateInfoUserRequest {
    weight: number;
    height: number;
    activityLevel:
    | 'Rất ít hoạt động'
    | 'Ít hoạt động'
    | 'Hoạt động vừa phải'
    | 'Hoạt động nhiều'
    | 'Hoạt động tích cực';
    gender: boolean;
    target: 'Giảm cân' | 'Tăng cân' | 'Giữ nguyên cân nặng';
    lastTimeToUpdate: string;
    protein: number;
    fat: number;
    carb: number;
}
