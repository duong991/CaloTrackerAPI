import deleteExpiredTokens from '../utils/tasks/deleteExpiredTokens ';
import { CronJob } from 'cron';

export const cronJobDeleteExpiredTokens = new CronJob(
    '0 0 * * *',
    deleteExpiredTokens,
    null,
    true,
    'Asia/Ho_Chi_Minh',
);
