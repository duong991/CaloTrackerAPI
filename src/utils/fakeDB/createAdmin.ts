import bcrypt from 'bcryptjs';
import User from '../../models/User';

async function createAdminAccount() {
    const username = 'admin';
    const password = 'admin123'; // Mật khẩu cho trước

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Mã hóa mật khẩu

    await User.create({
        username,
        password: hashedPassword,
        role: 1,
    });

    console.log(
        `Created admin account with username ${username} and password ${password}`,
    );
}

export default createAdminAccount;
