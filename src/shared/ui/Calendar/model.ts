import {TimeStamp} from "@/shared/lib";

export const days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
]

type DayInfo = {
    isEmpty: boolean;
    date?: TimeStamp;
}

export function getDaysList(timestamp: TimeStamp): DayInfo[] {
    const date = new Date(timestamp);

    date.setDate(1);

    const daysInMonth: DayInfo[] = [];
    const firstDayOfWeek = date.getDay(); // День недели для первого дня (0 - воскресенье, 1 - понедельник, ...)

    if (firstDayOfWeek !== 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
            daysInMonth.push({ isEmpty: true });
        }
    }

    const currentMonth = date.getMonth();
    while (date.getMonth() === currentMonth) {
        daysInMonth.push({
            isEmpty: false,
            date: date.getTime(),
        });
        date.setDate(date.getDate() + 1);
    }

    return daysInMonth;
}