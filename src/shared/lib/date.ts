import {TimeStamp} from "@/shared/lib/types.ts";
import {RepeatType} from "@/shared/api/enum.ts";

const monthNames: Record<string, string> = {
    0: 'Январь',
    1: 'Февраль',
    2: 'Март',
    3: 'Апрель',
    4: 'Май',
    5: 'Июнь',
    6: 'Июль',
    7: 'Август',
    8: 'Сентябрь',
    9: 'Октябрь',
    10: 'Ноябрь',
    11: 'Декабрь',
}

const relativeMonthNames: Record<string, string> = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря',
}

const monthShortcuts: Record<string, string> = {
    0: 'янв.',
    1: 'февр.',
    2: 'март',
    3: 'апр.',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'авг.',
    8: 'сент.',
    9: 'окт.',
    10: 'нояб.',
    11: 'дек.',
}

const dayNameMap: Record<number, string> = {
    0: 'вс',
    1: 'пн',
    2: 'вт',
    3: 'ср',
    4: 'чт',
    5: 'пт',
    6: 'сб',
}

export function getCurrentMonth() {
    return monthNames[new Date().getMonth()]
}

export function getMonthFromTS(ts: TimeStamp): string {
    const date = new Date(ts)

    return monthNames[date.getMonth()]
}

export function getYearFromTS(ts: TimeStamp): number {
    const date = new Date(ts)

    return date.getFullYear()
}

export function getRelativeMonth(ts: TimeStamp) {
    return relativeMonthNames[new Date(ts).getMonth()]
}

export function getMonthShortcut(ts: TimeStamp) {
    return monthShortcuts[new Date(ts).getMonth()]
}

export function getDayShortcut(ts: TimeStamp) {
    return dayNameMap[new Date(ts).getDay()]
}

export function getDayShortcutByIndex(key: number) {
    return dayNameMap[key]
}

export function getRepeatTypeText(
    type: RepeatType,
    value: number
) {
    if (type === RepeatType.WEEK) {
        if (value === 1) {
            return 'неделя'
        }

        return 'недели'
    }

    if (value === 1) {
        return 'день'
    }

    return 'дня'
}

export function getIsToday(ts: TimeStamp): boolean {
    const now = new Date()
    const curr = new Date(ts)

    return (
        now.getDate() === curr.getDate() &&
        now.getMonth() === curr.getMonth() &&
        now.getFullYear() === curr.getFullYear()
    )
}

export function isSameDays(ts1: TimeStamp, ts2: TimeStamp): boolean {
    const first = new Date(ts1)
    const second = new Date(ts2)

    return (
        first.getDate() === second.getDate() &&
        first.getMonth() === second.getMonth() &&
        first.getFullYear() === second.getFullYear()
    )
}

export function getIsTomorrow(ts: TimeStamp): boolean {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const curr = new Date(ts)

    return (
        tomorrow.getDate() === curr.getDate() &&
        tomorrow.getMonth() === curr.getMonth() &&
        tomorrow.getFullYear() === curr.getFullYear()
    )
}

export function getDayFromTS(ts: TimeStamp): number {
    const date = new Date(ts)

    return date.getDate()
}

export function setToMidnight(timestamp: TimeStamp): TimeStamp {
    const date = new Date(timestamp)
    date.setHours(0, 0, 0, 0)
    return date.getTime()
}

export function addDaysToTimestamp(timestamp: TimeStamp, daysToAdd: number): TimeStamp {
    const date = new Date(timestamp)
    date.setDate(date.getDate() + daysToAdd)
    return date.getTime()
}

export function getIsWeekend(ts: TimeStamp) {
    const currDay = new Date(ts).getDay()

    return (
        currDay === 0 ||
        currDay === 6
    )
}

export function getTimeRange(startTime: TimeStamp, endTime: TimeStamp): string {
    const startFormatted = formatTime(startTime)
    const endFormatted = formatTime(endTime)

    return `${startFormatted} - ${endFormatted}`
}

export function formatTime(timestamp: TimeStamp): string {
    const date = new Date(timestamp)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export function tsToWordOrFormatted(ts: TimeStamp): string {
    if (getIsToday(ts)) {
        return 'Сегодня'
    }

    if (getIsTomorrow(ts)) {
        return 'Завтра'
    }

    const date = new Date(ts)
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
}

export function tsToDayName(ts: TimeStamp): string {
    const data = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ]

    const date = new Date(ts)

    return data[date.getDay()]
}

export function getToday() {
    return setToMidnight(new Date().getTime())
}

export function getTomorrow() {
    const tomorrowDate = new Date()
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)

    return setToMidnight(tomorrowDate.getTime())
}

export function toTime(timestamp: TimeStamp): {
    days: number
    hours: number
    minutes: number
} {
    if (timestamp <= 0) {
        return { days: 0, hours: 0, minutes: 0 }
    }

    const minutes = Math.floor(timestamp / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    return {
        days: days,
        hours: hours % 24,
        minutes: minutes % 60,
    };
}

export function getTimeUntil(timestamp: TimeStamp): TimeStamp {
    const now = Date.now()

    return timestamp - now
}

export function getTimeDiff(
    startTime: TimeStamp,
    endTime: TimeStamp
) {
    return endTime - startTime
}