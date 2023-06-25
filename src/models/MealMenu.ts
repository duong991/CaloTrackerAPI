// import { Model, DataTypes } from 'sequelize';
// import { sequelize } from '../config/connectDB';

// // import Menu from './Menu';
// import Meal from './Meal';
// import { MealMenuAttributes } from '../interfaces/models/model.interface';
// class MealMenu extends Model<MealMenuAttributes> implements MealMenuAttributes {
//     public id!: number;
//     public menuId!: number;
//     public mealId!: number;
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;

//     public static associate = () => {
//         // MealMenu.belongsTo(Menu, { foreignKey: 'menuId', as: 'menu' });
//         MealMenu.belongsTo(Meal, { foreignKey: 'mealId', as: 'meal' });
//     };
// }

// MealMenu.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         menuId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Menu,
//                 key: 'id',
//             },
//         },
//         mealId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: Meal,
//                 key: 'id',
//             },
//         },
//     },
//     {
//         sequelize,
//         modelName: 'MealMenu',
//         tableName: 'Meal_Menus',
//     },
// );

// export default MealMenu;
