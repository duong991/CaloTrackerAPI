import Token from '../../models/Token';
import { Op } from 'sequelize';

const deleteExpiredTokens = async () => {
    const expiredTokens = await Token.findAll({
        where: {
            expireAt: {
                [Op.lt]: new Date(),
            },
        },
    });

    await Token.destroy({
        where: {
            id: {
                [Op.in]: expiredTokens.map((token) => token.id),
            },
        },
    });
};

export default deleteExpiredTokens;
