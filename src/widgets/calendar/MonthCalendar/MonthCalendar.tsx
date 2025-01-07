import React, {useCallback, useEffect, useRef, useState} from "react"
import {clsx} from "clsx"

import {CalendarEvent} from "@/entities/events/model"

import {getDayFromTS, getIsToday, getIsWeekend} from "@/shared/lib/date.ts"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"

import styles from './MonthCalendar.module.scss'

export type MonthCalendarEvent = {
    days: CalendarEvent[]
    isFetching?: boolean
    onScrollEnd?: () => void
}

export const MonthCalendar: React.FC<MonthCalendarEvent> = ({
    days,
    isFetching,
    onScrollEnd,
}) => {
    const rootRef = useRef<HTMLDivElement | null>(null)

    const [viewDays, setViewDays] = useState<CalendarEvent[]>([])

    const daysNames = [
        'пн',
        'вт',
        'ср',
        'чт',
        'пт',
        'сб',
        'вс',
    ]

    const handleScroll = useCallback(() => {
        const element = document.querySelector('#calendarPage')
        if (element) {
            console.log('scroll')
            const isBottom =
                element.scrollHeight - element.scrollTop === element.clientHeight
            if (isBottom) {
                console.log(isBottom, 'isBottom')
                onScrollEnd?.()
            }
        }
    }, [onScrollEnd])

    useEffect(() => {
        if (days.length) {
            // const [day, month, year] = days[0].date.split('-').map(Number);
            let firstDay = new Date(days[0].date).getDay(); // День недели (0 = Воскресенье, 1 = Понедельник, ...)
            const result: CalendarEvent[] = [];
            let i = 1;

            while (firstDay !== 1) {
                const currDate = new Date(days[0].date);
                currDate.setDate(currDate.getDate() - i); // Отнимаем дни от текущей даты

                result.unshift({
                    date: currDate.getTime(),
                    events: [],
                });

                i++;
                firstDay = currDate.getDay();
            }

            setViewDays([
                ...result,
                ...days,
            ]);

        }
    }, [days]);

    useEffect(() => {
        document.querySelector('#calendarPage')?.addEventListener('scroll', handleScroll);

        return () => {
            document.querySelector('#calendarPage')?.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <div
            ref={rootRef}
            className={styles.root}
        >
            <div className={styles.header}>
                {daysNames.map(item => (
                    <div key={item} className={styles['header-item']}>
                        {item}
                    </div>
                ))}
            </div>
            <div className={styles.body}>
                {viewDays.map(day => (
                    <div
                        key={day.date}
                        className={clsx(
                            styles['body-item'],
                            {
                                [styles['is-active']]: getIsToday(day.date),
                                [styles['is-weekend']]: getIsWeekend(day.date),
                            }
                        )}
                    >
                        <p
                            className={styles['body-item-date']}
                        >
                            {getDayFromTS(day.date)}
                        </p>
                        {day.events.map((event) => (
                            <div
                                key={event.id}
                                className={styles['body-item-event']}
                            >
                                <div
                                    style={{
                                        backgroundColor: event.color
                                    }}
                                />
                                <p
                                    style={{
                                        color: event.color,
                                    }}
                                >
                                    {event.name}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <TransitionFade className={styles.loader}>
                {isFetching && (
                    <Loader
                        size={'m'}
                        color={'white'}
                    />
                )}
            </TransitionFade>
        </div>
    )
}