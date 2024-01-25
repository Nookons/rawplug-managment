import dayjs from "dayjs";

export function getCurrentDate () {
    const date      = dayjs().toDate().toDateString();

    const HOUR      = dayjs().get('hour')
    const MINUTES   = dayjs().get('minute')

    let myMinutes   = '00'

    if (MINUTES.toString().length < 2) {
        myMinutes = '0' + MINUTES;
    }else {
        myMinutes = MINUTES
    }

    return date + ' at ' + HOUR + ':' + myMinutes
}