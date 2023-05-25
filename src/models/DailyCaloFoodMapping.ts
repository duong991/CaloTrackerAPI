import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import { DailyCaloFoodMappingAttributes } from '../interfaces/models/model.interface';
import Food from './Food';
import UserFood from './UserFood';
import UserMeal from './UserMeal';
import UserMenu from './UserMenu';
import Menu from './Menu';
import Meal from './Meal';
import DailyCalo from './DailyCalo';
class DailyCaloFoodMapping
    extends Model<DailyCaloFoodMappingAttributes>
    // eslint-disable-next-line prettier/prettier
    implements DailyCaloFoodMappingAttributes {
    public id!: number;
    public dailyCaloId!: number;
    public foodId?: number;
    public userFoodId?: number;
    public mealId?: number;
    public userMealId?: number;
    public menuId?: number;
    public userMenuId?: number;
    public servingSize?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        DailyCaloFoodMapping.belongsTo(Food, {
            foreignKey: 'foodId',
            as: 'food',
        });
        DailyCaloFoodMapping.belongsTo(UserFood, {
            foreignKey: 'userFoodId',
            as: 'userFood',
        });
        DailyCaloFoodMapping.belongsTo(Meal, {
            foreignKey: 'mealId',
            as: 'meal',
        });
        DailyCaloFoodMapping.belongsTo(UserMeal, {
            foreignKey: 'userMealId',
            as: 'userMeal',
        });
        DailyCaloFoodMapping.belongsTo(Menu, {
            foreignKey: 'menuId',
            as: 'menu',
        });
        DailyCaloFoodMapping.belongsTo(UserMenu, {
            foreignKey: 'userMenuId',
            as: 'userMenu',
        });
        DailyCaloFoodMapping.belongsTo(DailyCalo, {
            foreignKey: 'dailyCaloId',
            as: 'dailyCalo',
        });
    };
}

DailyCaloFoodMapping.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dailyCaloId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: DailyCalo,
                key: 'id',
            },
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Food,
                key: 'id',
            },
        },
        userFoodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: UserFood,
                key: 'id',
            },
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Meal,
                key: 'id',
            },
        },
        userMealId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: UserMeal,
                key: 'id',
            },
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Menu,
                key: 'id',
            },
        },
        userMenuId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: UserMenu,
                key: 'id',
            },
        },
        servingSize: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'DailyCaloFoodMapping',
        tableName: 'Daily_Calo_Food_Mappings',
    },
);

export default DailyCaloFoodMapping;
