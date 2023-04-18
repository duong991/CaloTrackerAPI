import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/connectDB';
import User from './User';

class Token extends Model {
    public id!: number;
    public userId!: number;
    public accessToken!: string;
    public refreshToken!: string;
    public expires!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate = () => {
        Token.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    };
}
Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        accessToken: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        expires: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        modelName: 'Token',
        sequelize,
        hooks: {
            beforeCreate: (token: Token) => {
                // Thiết lập giá trị cho trường expires
                const now = new Date();
                const expiresIn = 60 * 60 * 24 * 7; // 1 tuần
                const expirationDate = new Date(
                    now.getTime() + expiresIn * 1000,
                );
                token.expires = expirationDate;
            },
        },
    },
);

export default Token;
