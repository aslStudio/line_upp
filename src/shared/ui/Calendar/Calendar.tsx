import React, {useCallback, useMemo} from "react"
import {clsx} from "clsx"

import {PropsDefault, TimeStamp} from "@/shared/lib"
import {getDayFromTS, getMonthFromTS, getYearFromTS, isSameDays} from "@/shared/lib/date.ts"
import {Icon} from "@/shared/ui/Icon"

import { days, getDaysList } from './model.ts'
import styles from './Calendar.module.scss'

export type CalendarProps = PropsDefault<{
    value: TimeStamp
    setValue: (value: TimeStamp) => void
}>

export const Calendar: React.FC<CalendarProps> = ({
    className,
    value,
    setValue
}) => {
    const daysList = useMemo(() => {
        return getDaysList(value)
    }, [value])

    const onNextMonth = useCallback(() => {
        const newDate = new Date(value)
        newDate.setMonth(newDate.getMonth() + 1)

        setValue(newDate.getTime())
    }, [value, setValue])

    const onPrevMonth = useCallback(() => {
        const newDate = new Date(value)
        newDate.setMonth(newDate.getMonth() - 1)

        setValue(newDate.getTime())
    }, [value, setValue])

    const onDaySelect = useCallback((ts: TimeStamp) => {
        const curr = new Date(ts)
        const newDate = new Date(value)
        newDate.setDate(curr.getDate())

        setValue(newDate.getTime())
    }, [value, setValue])

    return (
        <div className={clsx(
            className,
            styles.root
        )}>
            <div className={styles.header}>
                <p>{getMonthFromTS(value)} {getYearFromTS(value)}</p>
                <div className={styles.buttons}>
                    <button
                        onClick={onPrevMonth}
                    >
                        <Icon
                            name={'chevron'}
                            view={'brand'}
                            size={20}
                        />
                    </button>
                    <button
                        onClick={onNextMonth}
                    >
                        <Icon
                            name={'chevron'}
                            view={'brand'}
                            size={20}
                        />
                    </button>
                </div>
            </div>
            <div>
                <div className={styles['content-header']}>
                    {days.map(item => (
                        <p>{item}</p>
                    ))}
                </div>
                <div className={styles['content-body']}>
                    {daysList.map(item => (
                        <button
                            className={clsx({
                                [styles['is-active']]: item.date && isSameDays(item.date, value),
                            })}
                            onClick={() => {
                                if (item.date) {
                                    onDaySelect(item.date)
                                }
                            }}
                        >
                            {!item.isEmpty ? getDayFromTS(item.date!) : ''}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}