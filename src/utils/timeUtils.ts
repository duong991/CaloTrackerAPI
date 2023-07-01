import moment from 'moment-timezone';

export const vietnamTime = moment().tz('Asia/Ho_Chi_Minh');

export function checkDateMatchCurrent(date: Date) {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return day === currentDay && month === currentMonth && year === currentYear;
}
