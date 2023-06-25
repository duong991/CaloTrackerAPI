import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import { CaloIntakeMappingAttributes } from '../interfaces/models/model.interface';
import Food from './Food';
import UserFood from './UserFood';
import UserMeal from './UserMeal';
// import UserMenu from './UserMenu';
// import Menu from './Menu';
import Meal from './Meal';
import DailyCalo from './DailyCalo';
class CaloIntakeMapping
    extends Model<CaloIntakeMappingAttributes>
    // eslint-disable-next-line prettier/prettier
    implements CaloIntakeMappingAttributes {
    public id!: number;
    public dailyCaloId!: number;
    public foodId?: number;
    public userFoodId?: number;
    public mealId?: number;
    public userMealId?: number;
    // public menuId?: number;
    // public userMenuId?: number;
    public servingSize?: number;
    public mealType!: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        CaloIntakeMapping.belongsTo(Food, {
            foreignKey: 'foodId',
            as: 'food',
        });
        CaloIntakeMapping.belongsTo(UserFood, {
            foreignKey: 'userFoodId',
            as: 'userFood',
        });
        CaloIntakeMapping.belongsTo(Meal, {
            foreignKey: 'mealId',
            as: 'meal',
        });
        CaloIntakeMapping.belongsTo(UserMeal, {
            foreignKey: 'userMealId',
            as: 'userMeal',
        });
        // CaloIntakeMapping.belongsTo(Menu, {
        //     foreignKey: 'menuId',
        //     as: 'menu',
        // });
        // CaloIntakeMapping.belongsTo(UserMenu, {
        //     foreignKey: 'userMenuId',
        //     as: 'userMenu',
        // });
        CaloIntakeMapping.belongsTo(DailyCalo, {
            foreignKey: 'dailyCaloId',
        });

        CaloIntakeMapping.belongsTo(DailyCalo, {
            foreignKey: 'dailyCaloId',
            targetKey: 'id',
            as: 'dailyCalo',
        });
    };
}

CaloIntakeMapping.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dailyCaloId: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        // menuId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: Menu,
        //         key: 'id',
        //     },
        // },
        // userMenuId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     references: {
        //         model: UserMenu,
        //         key: 'id',
        //     },
        // },
        servingSize: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        mealType: {
            type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'CaloIntakeMapping',
        tableName: 'calo_intake_mappings',
    },
);

export default CaloIntakeMapping;
