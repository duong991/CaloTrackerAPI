import User from '../../../models/User';

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
};

export default AccManagerService;
