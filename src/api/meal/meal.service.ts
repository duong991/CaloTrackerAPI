import User from '../../models/User';

interface AccManagerService {
    createAccount: (email: string, password: string) => Promise<User>;
    getAccountById: (id: number) => Promise<User | null>;
    getAllAccounts: () => Promise<User[] | null>;
    updateAccount: (id: number, email: string) => Promise<[number, User[]]>;
    deleteAccount: (id: number) => Promise<number>;
}

const AccManagerService: AccManagerService = {
    createAccount: async (email: string, password: string): Promise<User> => {
        const newUser = await User.create({ email, password: password });
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
        email: string,
    ): Promise<[number, User[]]> => {
        const [numberOfAffectedRows, [updatedUser]] = await User.update(
            { email },
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
