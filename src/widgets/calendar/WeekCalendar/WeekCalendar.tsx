import React, {useCallback, useEffect, useRef} from "react"
import {clsx} from "clsx"

import {EventWeekCard} from "@/entities/events/ui"
import {CalendarEvent} from "@/entities/events/model"

import {Icon} from "@/shared/ui/Icon"
import {getCurrentMonth, getDayFromTS, getIsToday, getMonthFromTS} from "@/shared/lib/date.ts"
import {TransitionFade} from "@/shared/ui/TransitionFade"
import {Loader} from "@/shared/ui/Loader"
import {TimeStamp} from "@/shared/lib"

import styles from './WeekCalendar.module.scss'
import {useCommonHeaderContext} from "@/widgets/common";

export type WeekCalendarProps = {
    days: CalendarEvent[]
    withCreateButton?: boolean
    isFetching?: boolean
    onClickAdd?: () => void
    onScrollEnd?: () => void
}

export const WeekCalendar: React.FC<WeekCalendarProps> = ({
    days,
    withCreateButton = false,
    isFetching,
    onClickAdd,
    onScrollEnd,
}) => {
    const { setTitle } = useCommonHeaderContext()

    const bodyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    function getHead(date: TimeStamp) {
        const parsedDate = new Date(date);

        const isToday = getIsToday(date)

        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date format. Please use "dd-MM-yyyy".');
        }

        const dayNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

        const dayName = dayNames[parsedDate.getDay()];
        const dayNumber = parsedDate.getDate();

        return (
            <div className={clsx(
                styles.head,
                {
                    [styles['is-active']]: isToday
                }
            )}>
                <p>{dayName}</p>
                <p>{dayNumber}</p>
            </div>
        )
    }

    const handleScroll = useCallback(() => {
        const element = bodyRef.current;

        const scrolledElements = Math.round(element!.scrollLeft / 135)

        if (headerRef.current) {

            headerRef.current?.scrollTo({
                behavior: 'smooth',
                left: scrolledElements * 50,
            })

            const newHeaderScroll = headerRef.current.scrollLeft

            const newDate = days[Math.round(newHeaderScroll / 50)].date
            console.log(getMonthFromTS(newDate))
            setTitle(getMonthFromTS(newDate))
        }

        if (element) {
            const isAtEnd =
                element.scrollWidth - element.scrollLeft === element.clientWidth;

            if (isAtEnd) {
                onScrollEnd?.()
            }
        }
    }, [onScrollEnd, days])

    useEffect(() => {
        bodyRef.current?.addEventListener('scroll', handleScroll)

        return () => {
            bodyRef.current?.removeEventListener('scroll', handleScroll)
        }
    }, [onScrollEnd]);

    useEffect(() => {
        setTitle(getCurrentMonth())
    }, [])

    return (
        <div>
            <div
                ref={headerRef}
                className={styles.header}
            >
                {days.map(day => (
                    <div
                        key={day.date}
                        className={clsx(
                            styles['header-item'],
                            {
                                [styles['is-active']]: getIsToday(day.date)
                            }
                        )}
                    >
                        <p className={styles.day}>
                            {getDayFromTS(day.date)}
                        </p>
                        <div className={styles.colors}>
                            {day.events.map(event => (
                                <span
                                    key={event.id}
                                    style={{
                                        backgroundColor: event.color,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div
                ref={bodyRef}
                className={styles.wrapper}
            >
                {days.map(day => (
                    <div key={day.date} className={styles.column}>
                        {getHead(day.date)}
                        <div className={styles['column-content']}>
                            {day.events.map(event => (
                                <EventWeekCard
                                    key={event.id}
                                    className={styles['event-card']}
                                    event={event}
                                />
                            ))}
                            {day.events.length === 0 && withCreateButton && (
                                <button
                                    className={styles['add-button']}
                                    onClick={onClickAdd}
                                >
                                    <div>
                                        <Icon
                                            className={styles.icon}
                                            name={'cross-icon'}
                                            view={'brand'}
                                            size={15}
                                        />
                                        <p>Создать <br/> событие</p>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <TransitionFade className={styles.loader}>
                    {isFetching && (
                        <Loader
                            size={'m'}
                            color={'white'}
                        />
                    )}
                </TransitionFade>
            </div>
        </div>
    )
}