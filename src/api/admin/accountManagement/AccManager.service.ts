import User from '../../../models/User';
import UserInfo from '../../../models/UserInfo';
import moment from 'moment';
import { Op } from 'sequelize';
interface AccManagerService {
    createAccount: (
        username: string,
        password: string,
        role: boolean,
    ) => Promise<User>;
    getAccountById: (id: number) => Promise<User | null>;
    getAllAccounts: () => Promise<User[] | null>;
    updateAccount: (
        id: number,
        username: string,
        role: boolean,
    ) => Promise<[number, User[]]>;
    deleteAccount: (id: number) => Promise<number>;

    getCountNewAccount: () => Promise<{
        countNewAccount: number;
        countAll: number;
    }>;

    getGender: () => Promise<{
        countMale: number;
        countFemale: number;
        countAll: number;
    }>;
}

const AccManagerService: AccManagerService = {
    createAccount: async (
        username: string,
        password: string,
        role: boolean,
    ): Promise<User> => {
        const newUser = await User.create({
            username: username,
            password: password,
            role: role,
        });
        return newUser;
    },

    getAccountById: async (id: number): Promise<User | null> => {
        const user = await User.findByPk(id);
        return user;
    },

    getAllAccounts: async (): Promise<User[] | null> => {
        const accounts = await User.findAll();
        return accounts;
    },

    updateAccount: async (
        id: number,
        username: string,
        role: boolean,
    ): Promise<[number, User[]]> => {
        const [numberOfAffectedRows, [updatedUser]] = await User.update(
            { username, role },
            { where: { id }, returning: true },
        );
        return [numberOfAffectedRows, [updatedUser]];
    },

    deleteAccount: async (id: number): Promise<number> => {
        const numberOfDeletedRows = await User.destroy({ where: { id } });
        return numberOfDeletedRows;
    },

    getCountNewAccount: async (): Promise<{
        countNewAccount: number;
        countAll: number;
    }> => {
        // Lấy ngày và giờ hiện tại
        const currentDate = moment().utcOffset(7); // Đặt múi giờ hiện tại của bạn (múi giờ +7)
        const startOfMonth = moment(currentDate).startOf('month').toDate();
        const endOfMonth = moment(currentDate).endOf('month').toDate();

        // Lấy danh sách người dùng trong khoảng thời gian đã cho
        const users = await User.findAll({ where: { role: 0 } });
        const newUser = users.filter((user) => {
            const createdAt = moment(user.createdAt).toDate();
            return createdAt >= startOfMonth && createdAt <= endOfMonth;
        });
        // Đếm số lượng người dùng
        const countNewAccount = newUser.length;
        const countAll = users.length;

        return {
            countNewAccount,
            countAll,
        };
    },

    getGender: async (): Promise<{
        countMale: number;
        countFemale: number;
        countAll: number;
    }> => {
        const allCustomers = await User.findAll({
            where: {
                role: 0,
            },
        });
        const ids = allCustomers.map((customer) => customer.id);
        const countMale = await UserInfo.findAll({
            where: {
                userId: {
                    [Op.in]: ids,
                },
                gender: 1,
            },
        }).then((users) => users.length);
        const countFemale = ids.length - countMale;
        const countAll = ids.length;
        return {
            countMale,
            countFemale,
            countAll,
        };
    },
};

export default AccManagerService;
