// time format: 'dd mmm - hh:mm'  29 tháng 5 - 21:41
function convertToDate(inputString: string): Date {
    const datePart = inputString.split(' - ')[0];
    const timePart = inputString.split(' - ')[1];

    const day = parseInt(datePart.split(' ')[0]);
    const month = parseInt(datePart.split(' ')[2]);
    const hours = parseInt(timePart.split(':')[0]);
    const minutes = parseInt(timePart.split(':')[1]);

    const currentYear = new Date().getFullYear();

    const dateObject = new Date(currentYear, month - 1, day, hours, minutes);

    return dateObject;
}
export default convertToDate;
